<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserCart;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class UserCartController extends Controller
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function index(Request $request)
    {
        
        return UserCart::with(['user'])
        ->with(['products'])
        // ->where('user_id', Auth::user()->id)
            // ->where('type', $request->get('type') == 1 ? Category::PRODUCT : Category::SERVICE)
            ->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }
    protected function validator(array $data)
    {
       
         return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'string', 'max:255'],
            'user_id' => ['required', 'integer'],
            'product_id' => ['required', 'integer'],
            'attributes' => ['required', 'string',],
        ]);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    { 
	//	return $request->get('attributes');
		//die();
		return DB::transaction(function () use ($request) {
            $validator = $this->validator($request->all());
            if (!$validator->fails()) {
                $cart = new UserCart();
				 $cart->product_id =  $request->get('product_id');
				 $cart->name =  $request->get('name');
				 $cart->price =  $request->get('price');
				 $cart->quantity =  $request->get('quantity');
				 $cart->attributes =  $request->get('attributes');
				 $cart->user_id = $request->get('user_id');//\Auth::user()->id,;
                //$cart->fill($request->all())->save();
				$cart->save();
                return response()->json([
                    'success' => true,
                    'cart' => $cart,
                    'message' => "Product has been added to Cart"
                ], 200);
            }
            return response()->json([
                'success' => false,
                'errors' => $this,
                'message' => $validator->getMessageBag()
            ], 401);
        });
    }

    /**
     * Display the specified resource.
     *
     * @param UserCart ID $id
     * @return UserCart
     */
    public function show($id)
    {
        $cupon = UserCart::where('id', $id)->first();
        return $cupon;
    }

     /**
     * Display the specified resource.
     *
     * @param UserCart User ID $user_id
     * @return UserCart
     */
    public function self()
    {
        $user = Auth::user();
        $cupon = UserCart::where('user_id', $user->id)
            ->where('ordered', false)->get();
        return $cupon;
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $userCart = UserCart::where('id', $id)
                    ->update($request->all());
        return response()->json([
            'success' => true,
            'cart' => $userCart,
            'message' => "Cart Updated"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $userCart = UserCart::where('id', $id)->delete();
        return response()->json([
            'success' => true,
            'message' => "Item Deleted"
        ], 200);
    }

    public function clear($id)
    {
        UserCart::where('user_id', $id)->delete();
        return response()->json([
            'success' => true,
            'message' => "Cart has been Clear"
        ], 200);
       
    }
    /**
     * Count total Coupns of User.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function count()
    {
       return UserCart::where('user_id', Auth::user()->id)->count();
    }
}
