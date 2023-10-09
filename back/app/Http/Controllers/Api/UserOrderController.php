<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use App\Models\Fedex;
use App\Models\EasyPost;
use App\Models\USPS;
use App\Models\Order;
use App\Models\UserOrder;
use App\Models\Prices;
use App\Models\Product;
use App\Models\flexefee;
use App\Models\ProductShippingDetail;
use App\Models\Refund;
use App\Models\ShippingDetail;
use App\Models\ShipingZone;
use App\Models\UserPayments;
use App\Models\User;
use App\Models\ShippingSize;
use App\Models\PaymentsLog;
use App\Models\UserCart;
use App\Models\PaymentsVendorLog;
use App\Notifications\OrderPlaced;
use App\Notifications\OrderPlacedSeller;
use App\Models\TrustedSeller;
use App\Notifications\DepositAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Stripe\StripeClient;
use Carbon\Carbon;
use App\Jobs\captureFunds;
use Illuminate\Support\Facades\Artisan;
use App\Traits\AppliedFees;
use App\Helpers\GuidHelper;

class UserOrderController extends Controller
{
    const SERVICETYPE = 'FEDEX_GROUND';//'STANDARD_OVERNIGHT';
    const FEDEXTESTSENTTRACKING = '111111111111';
    const FEDEXTESTDELIVEREDTRACKING = '122816215025810';
    // use AppliedFees; 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
       
        $data['order'] = UserOrder::Where(
                'buyer_id',
                Auth::user()->id
            )
            ->with(["product" => function (BelongsTo $hasMany) {
                $hasMany->select(Product::defaultSelect());
            }, "buyer" => function (BelongsTo $hasMany) {
                $hasMany->select(User::defaultSelect());
            }, 'shippingDetail' => function (BelongsTo $hasMany) {
                $hasMany->select(ShippingDetail::defaultSelect());
            }, 
            'shippingrate' => function ($query) {
                $query->select(ShipingZone::defaultSelect());
            },
                'userpayments' => function ($query) {
                    $query->select(UserPayments::defaultSelect());
            }
            ])->get();

        return $data['order'];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Update for USPS
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update_USPS(Order $order, Request $request){
        try{
            return DB::transaction(function () use ($request, $order) { 
    

                $shouldUpdate = true;
                 
                if ($request->has('status')) {
                    
                    $stripe = new StripeClient(env('STRIPE_SK'));
                    $paymentIntent = $stripe->paymentIntents->retrieve($request->get('payment_intent'));
                  
                    if ($paymentIntent->id !== $request->get('payment_intent') || $paymentIntent->status !== 'requires_capture'){
                         
                        $shouldUpdate = false;
                    }
                        
                }
    
                // if ($shouldUpdate) {
                    $buyer = User::where('id', $order->buyer_id)->first();
                    $seller = User::where('id', $order->seller_id)->first();
                    $product = Product::where('id', $order->product_id)->first();
                    $buyer_shipping = ShippingDetail::where('id', $order->shipping_detail_id)->first();
                   
                    $resp = '<CarrierPickupScheduleRequest USERID="974FLEXM7409">
                                <FirstName>'. $buyer->name .'</FirstName>
                                <LastName>'. $buyer->name .'</LastName>
                                <FirmName>Zecodo</FirmName>
                                <SuiteOrApt>Suite 101</SuiteOrApt>
                                <Address2>'. $buyer_shipping->street_address .'</Address2>
                                <Urbanization></Urbanization>
                                <City>'. $buyer_shipping->city .'</City>
                                <State>'.  $buyer_shipping->state .'</State>
                                <ZIP5>'. $buyer_shipping->zip .'</ZIP5>
                                <ZIP4>1000</ZIP4>
                                <Phone>5555551234</Phone>
                                <Extension></Extension>
                                <Package>
                                <ServiceType>PriorityMailExpress</ServiceType>
                                <Count>2</Count>
                                </Package>
                                <Package>
                                <ServiceType>PriorityMail</ServiceType>
                                <Count>1</Count>
                                </Package>
                                <EstimatedWeight>14</EstimatedWeight>   
                                <PackageLocation>Front Door</PackageLocation>
                                <SpecialInstructions>Packages are behind the screen door.</SpecialInstructions>
                            </CarrierPickupScheduleRequest>';
                    
                    $_shipment = USPS::createShipment($resp);
                    
                    $req = $request->all();
                    if (isset($_shipment["errors"])) {
                        
                        throw new \Exception($_shipment["errors"][0]['message'], 1);
                        
                    } else if (isset($_shipment["ConfirmationNumber"])) {

                        $metadata = null;
                        $req["tracking_id"] = $_shipment["ConfirmationNumber"];
                        $req["fedex_shipping"] = json_encode($_shipment);
                        $order->fill($req);
                        $order->update();
                        $paymentmode = "Incomplete";
                        $paymentslog = PaymentsLog::request($paymentIntent,$req['status'],$paymentmode, $metadata);
                        $product->is_sold = true;
                        $product->update();
                        // Artisan::call('queue:work  --daemon');
                        // @Todo: create a different controller action for order confirmation
                        if ($request->has('status')) {
                            /** @var User $user */
                            $user = Auth::user();
                            $user->notify(new OrderPlaced($order));
                            $seller->notify(new OrderPlacedSeller($order));
                        }
                        // depositStripeFund::dispatch();
                        // Artisan::call('schedule:run');
            
                    }
                // }
    
            });
        }
        catch(Exception $e) {
            throw $e;
        }finally{
            $stripe = new StripeClient(env('STRIPE_SK'));
            $seller = User::where('id', $order->seller_id)->first();
            $account = $stripe->accounts->retrieve(
                $seller->stripe_account_id,
                []
              );
              if($account->capabilities->card_payments== "inactive" || $account->capabilities->transfers== "inactive")
              {
                $user = Auth::user();
                $user->notify(new DepositAccount($order));
              }else{
                //Artisan::call('capture:funds');
                return $order;
              }
       }
    }   
    public function store__(Request $request){

        $request="";
        $order="";
        return DB::transaction(function () use ($request, $order) {  
            $stripe = new StripeClient(env('STRIPE_SK'));
            //for Updating Order Status Delivered by EasyPost
            $orders_delivered = Order::whereDate('created_at', '<=', Carbon::now()->subDays(2)->toDateTimeString())
               ->where('status', Order::STATUS_UNCAPTURED)
            //    ->where('id','231')
                ->whereNotNull('payment_intent')
                ->each(function (Order $order) use ($stripe) {
                    $data = "";
                    $trackingId = $order->tracking_id;
                    $trackerShipment = EasyPost::trackShipment($data);
                    $trackerShipment = json_decode($trackerShipment);
                    if($trackerShipment->status == Order::DELIVERED){
                        $order->deliver_status = Order::DELIVERED;
                        $order->update();
                    };      
                });
                
            //For Payments
            $orders = Order::whereDate('created_at', '<=', Carbon::now()->subDays(2)->toDateTimeString())
               ->where('status', Order::STATUS_UNCAPTURED)
               ->where('deliver_status',Order::DELIVERED)
                ->whereNotNull('payment_intent')
                ->each(function (Order $order) use ($stripe) {
                    $paymentIntent = $stripe->paymentIntents->retrieve($order->payment_intent);
                    if($paymentIntent->status === 'requires_capture')
                    {
                        $trustedSeller = TrustedSeller::where('user_id',$order->seller_id)->first();
                        if($trustedSeller){
                            $stripe->paymentIntents->capture($order->payment_intent);
                        }else{
                            
                            $stripe->paymentIntents->capture($orders->payment_intent);
                            //$value = \Session::get('transferGroup');
                            // $charge = $stripe->charges->create(array(
                            //     'currency' => 'USD',
                            //     'amount'   => $paymentIntent->amount,
                            //     'source' => 'tok_bypassPending'
                            // ));
                            $value = $orders->price;//$paymentIntent['amount_received'];
                           
                            //Remaining after subtracting Stripe Fee => Total Amount
                            $totalAmount = $this->feePriceCalculator($orders->price);
                            
                            // $remaining = $value - $feePriceCalculator;
                            $flexePoint = 10;
                            $flexeAmount = ($flexePoint/100) * $totalAmount;
                            $sellerAmount = $totalAmount - $flexeAmount;
                            //Getting Seller Account
                            $seller = User::where('id',$orders->seller_id)->first();
                            $product = Product::where('id', $orders->product_id)->first();
                            // Create a Transfer to a connected account (later):
                            $transfer = $stripe->transfers->create([
                                // 'amount' => (int)$remaining,//$product->getPrice() * 100,
                                'amount' => (int)$sellerAmount * 100,//$product->getPrice() * 100,
                                'currency' => 'usd',
                                'destination' => $seller->stripe_account_id,
                                'transfer_group' => $orders->price
                            ]);
                            
                            // // // Create a second Transfer to another connected account (later):
                           
                            $transfer = $stripe->transfers->create([
                                // 'amount' => (int)$percent,
                                'amount' => (int)$flexeAmount * 100,
                                'currency' => 'usd',
                                // Flexe Admin Stripe Account => acct_1MH75gReJCB3JLnc
                                'destination' => 'acct_1MH75gReJCB3JLnc', 
                                'transfer_group' => $orders->price
                            ]);
                            $metadata = null;
                            //For Payment Log
                            PaymentsLog::request($paymentIntent,Order::STATUS_PAID,'Paid To Stripe',$metadata);
                            $order->status = Order::STATUS_PAID;
                            $order->update();
                           
                        }
                }else{
                        
                    /**                         * 
                     * if Captures in stripe but not Updated 
                     * in Orders so it would be PAID 
                     */
                    $metadata = null;
                    $paymentIntent = $stripe->paymentIntents->retrieve($order->payment_intent);
                    PaymentsLog::request($paymentIntent,Order::STATUS_PAID,'Paid To Stripe',$metadata);
                    $order->status = Order::STATUS_PAID;
                    $order->update();
                }
            });
        });
    }
    public function store(Request $request)
    {    
        return DB::transaction(function () use ($request) {
            $shipping = new ShippingDetail();
            if($request->get("other_address") == '2'){
                // $shipping->fill($request->get("shippingDetail"));
                $shipping->user_id = Auth::user()->id;
                $shipping->name = $request->get("fname_other") . ' ' . $request->get("lname_other");
                $shipping->street_address = $request->get("address_other");
                $shipping->state = $request->get("state_other");
                $shipping->city = $request->get("city_other");
                $shipping->zip = $request->get("zip_other");
                $shipping->save();
    
            }else if($request->get("other_address") == '1'){
                // $shipping->fill($request->get("shippingDetail"));
                $shipping->user_id = Auth::user()->id;
                $shipping->name = $request->get("fname") . ' ' . $request->get("lname");
                $shipping->street_address = $request->get("address");
                $shipping->state = $request->get("state");
                $shipping->city = $request->get("city");
                $shipping->zip = $request->get("zip");
                $shipping->save();
    
            }
            // $product = Product::getByGuid($request->get('product_id'));
            // // $offer = $product->offers()->where('requester_id', Auth::user()->id)
            // //     ->where('status_name', Offer::$STATUS_ACCEPT)
            // //     ->first();
            // // $order->seller_id = $product->user_id;
            /**
             * Deleting cart Info
             */
            $userCart = UserCart::where('user_id', '=' , Auth::user()->id)->delete();

            $order = new UserOrder();
            $order->orderid = GuidHelper::getShortGuid();
            $order->fname = $request->get("fname");
            $order->lname = $request->get("lname");
            $order->company = $request->get("company");
            $order->region = $request->get("region");
            $order->address = $request->get("address");
            $order->city = $request->get("city");
            $order->state = $request->get("state");
            $order->zip = $request->get("zip");
            $order->phone = $request->get("phone");
            $order->email = $request->get("email");
            $order->shipping_rate = $request->get("shipping_rate") ? $request->get("shipping_rate") : 0;
            $order->order_notes = $request->get("order_notes");
            $order->shipment_type = $request->get("shipment_type")? $request->get("shipment_type") : 0;
            // $order->shipment_track_id = "";
            // $order->shipping_details = "";
            $order->payment_status = UserOrder::STATUS_UNPAID;
            $order->Amount= $request->get("Amount");
            $order->Curency = $request->get("Curency");
            $order->Customer = Auth::user();
            $order->payment_method_type = $request->get("payment_method_type");
            $order->buyer_id = Auth::user()->id;
            $order->shipping_detail_id = $shipping->id;
            $order->shipping_rate_id = $request->get("shipping_rate_id") ? $request->get("shipping_rate_id") : 0;
            $order->user_payments_id = $request->get("user_payments_id") ? $request->get("user_payments_id") : 0;
            $order->status = false;
            $order->deliver_status = false;
            $order->admin_notes = $request->get("admin_notes");
            $order->cartItems = $request->get("cartItems");
            $order->created_at = Carbon::now()->toDateTimeString();//'2023-01-30 17:40:31';
            $order->updated_at = Carbon::now()->toDateTimeString();//'2023-01-30 17:40:31';
            $order->save();

            $userMessages = new  UserMyMessages();
            $userMessages->sender_id = 1;
            $userMessages->recipent_id = Auth::user()->id;
            $userMessages->guid = GuidHelper::getShortGuid();
            $userMessages->subject = 'Order has Been Generated';
            $userMessages->profile_url = Auth::user();
            $userMessages->data = "Your Order has been Send Please wait for admin for approval";
            $userMessages->data = "Your Order has been Send Please wait for admin for approval";
            $userMessages->type = "Order Created";
            $userMessages->save();
            // $product->is_sold = true;
            // $product->update();
            // // if($offer){
            // //     Offer::where('id', $offer->id)->where('product_ id', $product->id)->delete();
            // // }
            // /** @var User $user */
            // $user = Auth::user();
            // $user->notify(new OrderPlaced($order));
            // // dispatch(new captureFunds($order));
            // // return depositStripeFund::dispatch()->onQueue('processing');
            
            return $order;
        });
    }

    public function prices(){
        $finalPrices = [];
        $prices = Prices::select('name','value')->where('active', true)->get();
        foreach($prices as $key=> $price){
            $finalPrices[$key] = $price;
        }
        return $finalPrices;
    }
    public function getTrsutedUserData($userid){
       $user = User::where('id', $userid)->where('isTrustedSeller',true)->first();
       if($user){
           return TrustedSeller::where('user_id', $user->id)->first();
       }else{
           return null;
       }
    }
    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    { 
        return Order::where('id', $id)->with(["product" => function (BelongsTo $hasMany) {
            $hasMany->select(Product::defaultSelect());
        }, "buyer" => function (BelongsTo $hasMany) {
            $hasMany->select(User::defaultSelect());
        }, "seller" => function (BelongsTo $hasMany) {
            $hasMany->select(User::defaultSelect());
        }, 'shippingDetail' => function (BelongsTo $hasMany) {
            $hasMany->select(ShippingDetail::defaultSelect());
        }, 'refund' => function ($query) {
            $query->select(Refund::defaultSelect());
        }])->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return Order
     */
    // public function update(Order $order, Request $request){
        
    // }
    public function update__(Order $order, Request $request){
        try{
            return DB::transaction(function () use ($request, $order) { 
                $shouldUpdate = true;
                if ($request->has('status')) {
                    $stripe = new StripeClient(env('STRIPE_SK'));
                    $paymentIntent = $stripe->paymentIntents->retrieve($request->get('payment_intent'));
                    if ($paymentIntent->id !== $request->get('payment_intent') || $paymentIntent->status !== 'requires_capture'){
                        $shouldUpdate = false;
                    }
                }
                // if ($shouldUpdate) {
                    $buyer = User::where('id', $order->buyer_id)->first();
                    $seller = User::where('id', $order->seller_id)->first();
                    $product = Product::where('id', $order->product_id)->first();
                    $buyer_shipping = ShippingDetail::where('id', $order->shipping_detail_id)->first();

                    if($seller->isTrustedSeller == true){
                        $trustedseller = TrustedSeller::where('user_id',$order->seller_id)->first();
                        if($trustedseller->shipmenttype == "Fedex"){
                             $resp = array(
                                'labelResponseOptions' => "URL_ONLY",
                                'requestedShipment' => array(
                                    'shipper' => array(
                                        'contact' => array(
                                            "personName" => $seller->name,//"Shipper Name",
                                            "phoneNumber" => '1234567890'// $seller->phone,//1234567890,
                                             ),
                                        'address' => array(
                                            'streetLines' => array(
                                                $product->street_address,
                                            ),
                                            "city" =>$product->city,//"HARRISON",
                                            "stateOrProvinceCode" =>$product->state,//"AR",
                                            "postalCode" => $product->zip,//72601,
                                            "countryCode" => "US"
                                        )
                                    ),
                                    'recipients' => array(
                                        array(
                                            'contact' => array(
                                                "personName" => $buyer->name,//"BUYER NAME",
                                                "phoneNumber" => '1234567980'//$buyer->phone,//1234567890,
                                           ),
                                            'address' => array(
                                                'streetLines' => array(
                                                    $buyer_shipping->street_address,//"Recipient street address",
                                                ),
                                                "city" => $buyer_shipping->city,//"Collierville"
                                                "stateOrProvinceCode" => $buyer_shipping->state,//"TN"
                                                "postalCode" => $buyer_shipping->zip,//38017
                                                "countryCode" => "US"
                                            )
                                        ),
                                    ),
                                    'shippingChargesPayment' => array(
                                        "paymentType" => "SENDER"
                                    ),
                                    "shipDatestamp" => Carbon::today()->format('Y-m-d'),
                                    "serviceType" => "FEDEX_GROUND",//"FEDEX_GROUND",//"STANDARD_OVERNIGHT",
                                    "packagingType" => "YOUR_PACKAGING",//"YOUR_PACKAGING",//"FEDEX_PK",
                                    "pickupType" => "USE_SCHEDULED_PICKUP",//"CONTACT_FEDEX_TO_SCHEDULE",//"USE_SCHEDULED_PICKUP",
                                    // "carrierCode"=> "FXSP",
                                    "blockInsightVisibility" => false,
                                    'labelSpecification' => array(
                                        "labelRotation"=> "UPSIDE_DOWN",
                                        "imageType"=> "PDF",
                                        "labelPrintingOrientation"=> "TOP_EDGE_OF_TEXT_FIRST",
                                        "returnedDispositionDetail"=> true,
                                        "labelStockType" => "PAPER_85X11_TOP_HALF_LABEL"
                                    ),
                                    'requestedPackageLineItems' => array(
                                        array(
                                            'weight' => array(
                                                "value" => $product->weight,//10,
                                                "units" => "LB"
                                            )
                                        ),
                                    ),
                                ),
                                'accountNumber' => array(
                                    "value" => "740561073"
                                ),
                            );
                            
                            $fedex_shipment = Fedex::createShipment($resp);
                            $req = $request->all();
                            if (isset($fedex_shipment["errors"])) {
                                
                                throw new \Exception($fedex_shipment["errors"][0]['message'], 1);
                                
                            } else if (isset($fedex_shipment["output"]["transactionShipments"][0]["masterTrackingNumber"])) {

                                $metadata = null;
                                $req["tracking_id"] = $fedex_shipment["output"]["transactionShipments"][0]["masterTrackingNumber"];
                                $req["fedex_shipping"] = json_encode($fedex_shipment);
                                $order->fill($req);
                                $order->update();
                                $paymentmode = "Incomplete";
                                $paymentslog = PaymentsLog::request($paymentIntent,$req['status'],$paymentmode, $metadata);
                                $product->is_sold = true;
                                $product->update();
                                // Artisan::call('queue:work  --daemon');
                                // @Todo: create a different controller action for order confirmation
                                if ($request->has('status')) {
                                    /** @var User $user */
                                    $user = Auth::user();
                                    $user->notify(new OrderPlaced($order));
                                    $seller->notify(new OrderPlacedSeller($order));
                                }
                                // depositStripeFund::dispatch();
                                // Artisan::call('schedule:run');
                    
                            }
                        // }
                        }else if($trustedseller->shipmenttype == "USPS"){
                                $resp = '<CarrierPickupScheduleRequest USERID="974FLEXM7409">
                                <FirstName>'. $buyer->name .'</FirstName>
                                <LastName>'. $buyer->name .'</LastName>
                                <FirmName>Zecodo</FirmName>
                                <SuiteOrApt>Suite 101</SuiteOrApt>
                                <Address2>'. $buyer_shipping->street_address .'</Address2>
                                <Urbanization></Urbanization>
                                <City>'. $buyer_shipping->city .'</City>
                                <State>'.  $buyer_shipping->state .'</State>
                                <ZIP5>'. $buyer_shipping->zip .'</ZIP5>
                                <ZIP4>1000</ZIP4>
                                <Phone>5555551234</Phone>
                                <Extension></Extension>
                                <Package>
                                <ServiceType>PriorityMailExpress</ServiceType>
                                <Count>2</Count>
                                </Package>
                                <Package>
                                <ServiceType>PriorityMail</ServiceType>
                                <Count>1</Count>
                                </Package>
                                <EstimatedWeight>14</EstimatedWeight>   
                                <PackageLocation>Front Door</PackageLocation>
                                <SpecialInstructions>Packages are behind the screen door.</SpecialInstructions>
                            </CarrierPickupScheduleRequest>';
                    
                            $_shipment = USPS::createShipment($resp);
                            
                            $req = $request->all();
                            if (isset($_shipment["errors"])) {
                                
                                throw new \Exception($_shipment["errors"][0]['message'], 1);
                                
                            } else if (isset($_shipment["ConfirmationNumber"])) {

                                $metadata = null;
                                $req["tracking_id"] = $_shipment["ConfirmationNumber"];
                                $req["fedex_shipping"] = json_encode($_shipment);
                                $order->fill($req);
                                $order->update();
                                $paymentmode = "Incomplete";
                                $paymentslog = PaymentsLog::request($paymentIntent,$req['status'],$paymentmode, $metadata);
                                $product->is_sold = true;
                                $product->update();
                                // Artisan::call('queue:work  --daemon');
                                // @Todo: create a different controller action for order confirmation
                                if ($request->has('status')) {
                                    /** @var User $user */
                                    $user = Auth::user();
                                    $user->notify(new OrderPlaced($order));
                                    $seller->notify(new OrderPlacedSeller($order));
                                }
                                // depositStripeFund::dispatch();
                                // Artisan::call('schedule:run');
                    
                            }
                        // }
                        }
                    }else{
                        $buyer_shipping = ShippingDetail::where('id', $order->shipping_detail_id)->first();
                        $resp = array(
                            'labelResponseOptions' => "URL_ONLY",
                            'requestedShipment' => array(
                                'shipper' => array(
                                    'contact' => array(
                                        "personName" => $seller->name,//"Shipper Name",
                                        "phoneNumber" => '1234567890'// $seller->phone,//1234567890,
                                    ),
                                    'address' => array(
                                        'streetLines' => array(
                                            $product->street_address,
                                        ),
                                        "city" =>$product->city,//"HARRISON",
                                        "stateOrProvinceCode" =>$product->state,//"AR",
                                        "postalCode" => $product->zip,//72601,
                                        "countryCode" => "US"
                                    )
                                ),
                                'recipients' => array(
                                    array(
                                        'contact' => array(
                                            "personName" => $buyer->name,//"BUYER NAME",
                                            "phoneNumber" => '1234567980'//$buyer->phone,//1234567890,
                                        ),
                                        'address' => array(
                                            'streetLines' => array(
                                                $buyer_shipping->street_address,//"Recipient street address",
                                            ),
                                            "city" => $buyer_shipping->city,//"Collierville"
                                            "stateOrProvinceCode" => $buyer_shipping->state,//"TN"
                                            "postalCode" => $buyer_shipping->zip,//38017
                                            "countryCode" => "US"
                                        )
                                    ),
                                ),
                                'shippingChargesPayment' => array(
                                    "paymentType" => "SENDER"
                                ),
                                "shipDatestamp" => Carbon::today()->format('Y-m-d'),
                                "serviceType" => "FEDEX_GROUND",//"FEDEX_GROUND",//"STANDARD_OVERNIGHT",
                                "packagingType" => "YOUR_PACKAGING",//"YOUR_PACKAGING",//"FEDEX_PK",
                                "pickupType" => "USE_SCHEDULED_PICKUP",//"CONTACT_FEDEX_TO_SCHEDULE",//"USE_SCHEDULED_PICKUP",
                                // "carrierCode"=> "FXSP",
                                "blockInsightVisibility" => false,
                                'labelSpecification' => array(
                                    "labelRotation"=> "UPSIDE_DOWN",
                                    "imageType"=> "PDF",
                                    "labelPrintingOrientation"=> "TOP_EDGE_OF_TEXT_FIRST",
                                    "returnedDispositionDetail"=> true,
                                    "labelStockType" => "PAPER_85X11_TOP_HALF_LABEL"
                                ),
                                'requestedPackageLineItems' => array(
                                    array(
                                        'weight' => array(
                                            "value" => $product->weight,//10,
                                            "units" => "LB"
                                        )
                                    ),
                                ),
                            ),
                            'accountNumber' => array(
                                "value" => "740561073"
                            ),
                        );
                        
                        $fedex_shipment = Fedex::createShipment($resp);
                        $req = $request->all();
                        if (isset($fedex_shipment["errors"])) {
                            throw new \Exception($fedex_shipment["errors"][0]['message'], 1);
                        } else if (isset($fedex_shipment["output"]["transactionShipments"][0]["masterTrackingNumber"])) {
                            $metadata = null;
                            $req["tracking_id"] = $fedex_shipment["output"]["transactionShipments"][0]["masterTrackingNumber"];
                            $req["fedex_shipping"] = json_encode($fedex_shipment);
                            $order->fill($req);
                            $order->update();
                            $paymentmode = "Incomplete";
                            $paymentslog = PaymentsLog::request($paymentIntent,$req['status'],$paymentmode, $metadata);
                            $product->is_sold = true;
                            $product->update();
                            // Artisan::call('queue:work  --daemon');
                            // @Todo: create a different controller action for order confirmation
                            if ($request->has('status')) {
                                /** @var User $user */
                                $user = Auth::user();
                                $user->notify(new OrderPlaced($order));
                                $seller->notify(new OrderPlacedSeller($order));
                            }
                            // depositStripeFund::dispatch();
                            // Artisan::call('schedule:run');
                        }
                    // }
                    }
            });
        }
        catch(Exception $e) {
            throw $e;
        }finally{
            $stripe = new StripeClient(env('STRIPE_SK'));
            $seller = User::where('id', $order->seller_id)->first();
            $account = $stripe->accounts->retrieve(
                $seller->stripe_account_id,
                []
              );
              if($account->capabilities->card_payments== "inactive" || $account->capabilities->transfers== "inactive")
              {
                $user = Auth::user();
                $user->notify(new DepositAccount($order));
              }else{
                if($seller->isTrustedSeller == true){
                    //Artisan::call('capture:vendorfunds');
                }else{
                   //Artisan::call('capture:funds');
                }
                return $order;
              }
       }
    }
    public function update1(Order $order, Request $request)
    {
       
        $stripe = new StripeClient(env('STRIPE_SK'));
        $seller = User::where('id', $order->seller_id)->first();
        $account = $stripe->accounts->retrieve(
            $seller->stripe_account_id,
            []
          );
          if($account->capabilities->card_payments== "inactive" || $account->capabilities->transfers== "inactive")
          {
            $user = Auth::user();
            $user->notify(new DepositAccount($order));
          }else{
            
            if($seller->isTrustedSeller == true){
              // Artisan::call('capture:vendorfunds');
            }else{
                //Artisan::call('capture:funds');
            }
            return $order;
          }
        }
        public function update(UserOrder $order, Request $request)
        {
            try{
               
                return DB::transaction(function () use ($request, $order) { 
                   
                $shouldUpdate = true;
                if ($request->get('payment_intent')) {
                    
                    $stripe = new StripeClient(env('STRIPE_SK'));
                    $paymentIntent = $stripe->paymentIntents->retrieve($request->get('payment_intent'));
                  
                    if ($paymentIntent->id !== $request->get('payment_intent') || $paymentIntent->status !== 'requires_capture'){
                         
                        $shouldUpdate = false;
                    }   
                }
                
                // if ($shouldUpdate) {
                    $buyer = User::where('id', $order->buyer_id)->first();
                    
                    $seller = Auth::user();//User::where('id', $order->seller_id)->first();
                    
                    // $product = Product::where('id', $order->product_id)->first();
                    $buyer_shipping = ShippingDetail::where('id', $order->shipping_detail_id)->first();
                    
                    // $resp = array(
                    //     'shipment' => array(
                    //         'from_address' => array(
                    //                 'name' =>  'asad',//$seller->name,
                    //                 'street1' => '813 Noble St',//$product->street_address,
                    //                 "city" => 'Fairbanks',//"HARRISON",
                    //                 "state" =>'AK',//"AR",
                    //                 "zip" => '99701',//72601,
                    //                 "country" => "US",
                    //                 "phone" => "3331114444",
                    //                 "email" => 'admin@admin.com'
                    //             ),
                    //         'to_address' => array(
                    //                 'name' =>  $buyer->name,
                    //                 'street1' => $buyer_shipping->street_address,
                    //                 "city" => $buyer_shipping->city,//"HARRISON",
                    //                 "state" => $buyer_shipping->state,//"AR",
                    //                 "zip" => $buyer_shipping->zip,//72601,
                    //                 "country" => "US",
                    //                 "phone" => "3331114444",
                    //                 "email" => $buyer->email
                    //             ),
                    //             // "shipDatestamp" => Carbon::today()->format('Y-m-d'),
                    //         'parcel' => array(
                    //             'length' => $product->length,
                    //             'width' => $product->width,
                    //             "height" => $product->height,
                    //             "weight" => $product->weight,
                    //         ),
                    //     )
                    // );
                    $order->order_action = $request->get('order_action');
                    $order->admin_notes = $request->get('admin_notes');
                    $order->admin_note_type = $request->get('admin_note_type');
                    $order->status = $request->get('status');
                    $order->payment_status = UserOrder::STATUS_PAID;
                    /***
                     * shipment tracking id after order confirming
                     */
                    // $order->shipment_track_id = ''; 
                    // $order->shipping_details = ''; 

                    /**
                     * After Payment Status
                     */
                    // $order->payment_status = '';
                    // $order->delivered_at = '';

                    /***
                     *After Successfull Delivery 
                     */
                    $order->deliver_status=UserOrder::DELIVERED;
                return $order;
            });
           
        }
        catch(Exception $e) {
            throw $e;
        }
    }
        public function update_1(Order $order, Request $request)
        {
        try{
            return DB::transaction(function () use ($request, $order) { 
                
                $shouldUpdate = true;
                if ($request->has('status')) {
                    
                    $stripe = new StripeClient(env('STRIPE_SK'));
                    $paymentIntent = $stripe->paymentIntents->retrieve($request->get('payment_intent'));
                  
                    if ($paymentIntent->id !== $request->get('payment_intent') || $paymentIntent->status !== 'requires_capture'){
                         
                        $shouldUpdate = false;
                    }
                        
                }
    
                // if ($shouldUpdate) {
                    $buyer = User::where('id', $order->buyer_id)->first();
                    $seller = User::where('id', $order->seller_id)->first();
                    $product = Product::where('id', $order->product_id)->first();
                    $buyer_shipping = ShippingDetail::where('id', $order->shipping_detail_id)->first();
                    //$shipping_size = ShippingSize::where('id', $product->shipping_size_id)->first();
                    //    $product_shipping_detail = ProductShippingDetail::where('user_id', $order->seller_id)->where('product_id', $order->product_id)->first();
            
                    $resp = array(
                        'labelResponseOptions' => "URL_ONLY",
                        'requestedShipment' => array(
                            'shipper' => array(
                                'contact' => array(
                                    "personName" => $seller->name,//"Shipper Name",
                                    "phoneNumber" => '1234567890'// $seller->phone,//1234567890,
                                    // "companyName" => "Shipper Company Name"
                                ),
                                'address' => array(
                                    'streetLines' => array(
                                        $product->street_address,
                                    ),
                                    // 'streetLines'=> [
                                    //     '10 FedEx Parkway',
                                    //     'Suite 302'
                                    // ],
                                    "city" =>$product->city,//"HARRISON",
                                    "stateOrProvinceCode" =>$product->state,//"AR",
                                    "postalCode" => $product->zip,//72601,
                                    "countryCode" => "US"
                                )
                            ),
                            'recipients' => array(
                                array(
                                    'contact' => array(
                                        "personName" => $buyer->name,//"BUYER NAME",
                                        "phoneNumber" => '1234567980'//$buyer->phone,//1234567890,
                                        // "companyName" => "Recipient Company Name"
                                    ),
                                    'address' => array(
                                        'streetLines' => array(
                                            $buyer_shipping->street_address,//"Recipient street address",
                                        ),
                                        // 'streetLines' => [
                                        //     '10 FedEx Parkway',
                                        //     'Suite 302'
                                        //   ],
                                        "city" => $buyer_shipping->city,//"Collierville"
                                        "stateOrProvinceCode" => $buyer_shipping->state,//"TN"
                                        "postalCode" => $buyer_shipping->zip,//38017
                                        "countryCode" => "US"
                                    )
                                ),
                            ),
                            'shippingChargesPayment' => array(
                                "paymentType" => "SENDER"
                            ),
                            "shipDatestamp" => Carbon::today()->format('Y-m-d'),
                            "serviceType" => "FEDEX_GROUND",//"FEDEX_GROUND",//"STANDARD_OVERNIGHT",
                            "packagingType" => "YOUR_PACKAGING",//"YOUR_PACKAGING",//"FEDEX_PK",
                            "pickupType" => "USE_SCHEDULED_PICKUP",//"CONTACT_FEDEX_TO_SCHEDULE",//"USE_SCHEDULED_PICKUP",
                            // "carrierCode"=> "FXSP",
                            "blockInsightVisibility" => false,
                            'labelSpecification' => array(
                                "labelRotation"=> "UPSIDE_DOWN",
                                "imageType"=> "PDF",
                                "labelPrintingOrientation"=> "TOP_EDGE_OF_TEXT_FIRST",
                                "returnedDispositionDetail"=> true,
                                "labelStockType" => "PAPER_85X11_TOP_HALF_LABEL"
                            ),
                            'requestedPackageLineItems' => array(
                                array(
                                    'weight' => array(
                                        "value" => $product->weight,//10,
                                        "units" => "LB"
                                    )
                                ),
                                // array(
                                //     'dimensions' => array(
                                //         "length" => "100",
                                //         "width" => "50",
                                //         "height" => "30",
                                //         "units"=> "CM"
                                //     )
                                // ),
                            ),
                        ),
                        'accountNumber' => array(
                            "value" => "740561073"
                        ),
                    );
                    $req = $request->all();
                    if($seller->isTrustedSeller == true){
                        $metadata = null;
                        $trustedSeller = TrustedSeller::where('user_id', $order->seller_id)->first();
                        $order->vendorshipmenttype = $trustedSeller->shipmenttype;
                        $order->vendorstatus = 'pending';
                        $order->fill($req);
                        $order->update();
                        $product->is_sold = true;
                        $product->update();
                        $paymentmode = "Incomplete";
                        $paymentslog = PaymentsVendorLog::request($paymentIntent,$req['status'],$paymentmode, $metadata);
                        if ($request->has('status')) {
                            /** @var User $user */
                            $user = Auth::user();
                            $user->notify(new OrderPlaced($order));
                            $seller->notify(new OrderPlacedSeller($order));
                        }
                    }else{
                        $fedex_shipment = Fedex::createShipment($resp);
                        
                        if (isset($fedex_shipment["errors"])) {
                            
                            throw new \Exception($fedex_shipment["errors"][0]['message'], 1);
                            
                        } else if (isset($fedex_shipment["output"]["transactionShipments"][0]["masterTrackingNumber"])) {

                            $metadata = null;
                            $req["tracking_id"] = $fedex_shipment["output"]["transactionShipments"][0]["masterTrackingNumber"];
                            $req["fedex_shipping"] = json_encode($fedex_shipment);
                            $order->fill($req);
                            $order->update();
                            $paymentmode = "Incomplete";
                            $paymentslog = PaymentsLog::request($paymentIntent,$req['status'],$paymentmode, $metadata);
                            $product->is_sold = true;
                            $product->update();
                            // Artisan::call('queue:work  --daemon');
                            // @Todo: create a different controller action for order confirmation
                            if ($request->has('status')) {
                                /** @var User $user */
                                $user = Auth::user();
                                $user->notify(new OrderPlaced($order));
                                $seller->notify(new OrderPlacedSeller($order));
                            }
                            // depositStripeFund::dispatch();
                            // Artisan::call('schedule:run');
                
                        }
                    // }
                    }
            });
        }
        catch(Exception $e) {
            throw $e;
        }
        finally{
            $stripe = new StripeClient(env('STRIPE_SK'));
            $seller = User::where('id', $order->seller_id)->first();
            $account = $stripe->accounts->retrieve(
                $seller->stripe_account_id,
                []
              );
              if($account->capabilities->card_payments== "inactive" || $account->capabilities->transfers== "inactive")
              {
                $user = Auth::user();
                $user->notify(new DepositAccount($order));
              }else{
                
                // if($seller->isTrustedSeller == true){
                    // Artisan::call('capture:vendorfunds');
                // }else{
                    // Artisan::call('capture:funds');
                    // Artisan::call('capture:vendorfunds');
                // }
                return $order;
              }
       }
    }

   
   
    public function fedexRateCalculator(Request $request){
       $data = $request->all();
    //    return \Auth::user();
       $req='{
            "accountNumber": {
            "value": "740561073"
            },
            "requestedShipment": {
            "shipper": {
                "address": {
                "postalCode": 65247,
                "countryCode": "US"
                }
            },
            "recipient": {
                "address": {
                "postalCode": '. $data[0]['shipping_detail']['zip'] .',
                "countryCode": "US"
                }
            },
            "pickupType": "USE_SCHEDULED_PICKUP",
            "rateRequestType": [
                "ACCOUNT",
                "LIST"
            ],
            "requestedPackageLineItems": [
                {
                "weight": {
                    "units": "LB",
                    "value": 10
                }
                }
            ]
            }
        }';
        $fedex_shipment = Fedex::calculateRate(Fedex::rateCalculator($data));
        return $fedex_shipment;
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function verifyAddressEasyPost(Request $request){
        $data = $request->all();
        $validateAddress = EasyPost::verifyAddress($data);
        return $validateAddress;
    }
    public function validatePostalCode(Request $request){
        /**
         * For FedEx
         */
        $data = $request->all();
        
        $validatePostalcode = Fedex::validatePostalCode($data);
       
        if (isset($validatePostalcode["errors"])) {
            throw new \Exception($validatePostalcode["errors"][0]['message'], 1);
        }else{
            return $validatePostalcode;
        }


    }
    public function delivered(Request $request, $id){
       $order = Order::where('id', $id)->update([
            'vendorstatus' => 'Delivered'
        ]);
        return "Order Delivered";
    }
    public function notdelivered(Request $request, $id){
        $order = Order::where('id', $id)->update([
            'vendorstatus' => 'Not Delivered'
        ]);
        return "Order Not Delivered";
    }

    public function validateAddress(Request $request){
        
        $requests = $request->all();
        $data = '<AddressValidateRequest USERID="974FLEXM7409">
                    <Revision>1</Revision>
                    <Address ID="0">
                        <Address1></Address1>
                        <Address2>'. $requests['street_address'] .'</Address2>
                        <City>Silver Spring</City>
                        <State>'. $requests['state'] .'</State>
                        <Zip5>'. $requests['zip'].'</Zip5>
                        <Zip4/>
                    </Address>
                </AddressValidateRequest>';
        $data0 = '<AddressValidateRequest USERID="974FLEXM7409">
                    <Revision>1</Revision>
                    <Address ID="0">
                        <Address1></Address1>
                        <Address2>FlexMarket Corp 935 Swinks Mill RD</Address2>
                        <City>Silver Spring</City>
                        <State>MD</State>
                        <Zip5>10002</Zip5>
                        <Zip4/>
                    </Address>
                </AddressValidateRequest>';
        $data__ ='<ZipCodeLookupRequest USERID="974FLEXM7409">
                    <Address ID="1">
                    <Address1></Address1>
                    <Address2>9600 colesville road</Address2>
                    <City>Silver Spring</City>
                    <State>MD</State>
                    <Zip5>20901</Zip5>
                    <Zip4></Zip4>
                    </Address>
                </ZipCodeLookupRequest>';

        $data_ ='<CityStateLookupRequest USERID="974FLEXM7409">
                    <City>Akron     </City>
                    <State></State>
                    <ZipCode ID="0">
                        <Zip5>10002</Zip5>
                    </ZipCode>
                </CityStateLookupRequest>';
        $validatePostalcode = USPS::validateAddress($data);
        
        if (isset($validatePostalcode["errors"])) {
            throw new \Exception($validatePostalcode["errors"][0]['message'], 1);
        }else{
            return $validatePostalcode;
        }
    }
    public function tracking($data)
    {
        /**
     * Fedex Start
     */
        /**
         * '111111111111' Test Tracking NO from Fedex
         */
        //     $track ="";
        //    if($data == self::FEDEXTESTSENTTRACKING){
        //     //For Shipment Sent to Fedex
        //         $trackingNo = self::FEDEXTESTSENTTRACKING;
        //         $track = Fedex::trackShipment(Fedex::trackPayload($trackingNo));
        //     }else if($data == self::FEDEXTESTDELIVEREDTRACKING){
        //         //For Testing Delivered
        //         $trackingNo =self::FEDEXTESTDELIVEREDTRACKING;
        //         $track = Fedex::trackShipment(Fedex::trackPayload($trackingNo));
        //    }else{
        //     $trackingNo = Order::where("tracking_id",$data)->get();
        //     $track = Fedex::trackShipment(Fedex::trackPayload($trackingNo[0]['tracking_id']));
        //     }
            
        //     return $track;
    /**
     * Fedex Ends
     */
    /**
     * For Easy Post
     */
        $track = EasyPost::trackShipment($data);
        return $track;
    }

    public function packed($data){
        $trackingNo = Order::find($data)->get();
        $track = Fedex::packed($trackingNo[0]['tracking_id']);
        return $track;
    }

    public function ratecalculator(Request $request){
        $data = $request->all();
       
        // $dataO = '<RateV4Request USERID="974FLEXM7409">
        //             <Revision>2</Revision>
        //             <Package ID="0">
        //             <Service>USPS Retail Ground</Service>
        //             <ZipOrigination>'. $data['shipperZip'] .'</ZipOrigination>
        //             <ZipDestination>'. $data['recipetZip'] .'</ZipDestination>
        //             <Pounds>'. $data['shipperweight'] .'</Pounds>
        //             <Ounces>'. $data['ounces'].'</Ounces>
        //             <Container></Container>
        //             <Width></Width>
        //             <Length></Length>
        //             <Height></Height>
        //             <Girth></Girth>
        //             <Machinable>TRUE</Machinable>
        //             </Package>
        //         </RateV4Request>';
            // For USPS Start
            // $returnRate = USPS::rateCalculator($dataO);
            // return $returnRate['Package']['Postage']['Rate'];
            // For USPS Ends
         // For FEDEX Start
        // return Fedex::rateCalculator(Fedex::payloadTrackRate($data));
        // $returnRate = Fedex::rateCalculator($data);
        
        // $rateReplyDetails = $returnRate['output']['rateReplyDetails'];
        // $rateDetail = [];
        // foreach($rateReplyDetails as $rateDetails){
        //     if($rateDetails['serviceType'] == self::SERVICETYPE){
        //         array_push($rateDetail, $rateDetails['ratedShipmentDetails'][0]['totalNetFedExCharge']);
        //     }
        // }
        // return $rateDetail;
        // For FEDEX Ends  
        //EasyPost Start
        $rates = EasyPost::shipmentRates($data);
        return $rates;
        //EasyPost Ends
    }
}
