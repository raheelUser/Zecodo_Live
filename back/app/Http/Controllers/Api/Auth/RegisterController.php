<?php

namespace App\Http\Controllers\Api\Auth;

use App\Helpers\ArrayHelper;
use App\Helpers\GuidHelper;
use App\Helpers\StripeHelper;
use App\Mail\BaseMailable;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegistrationRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Otp;
use Tymon\JWTAuth\JWTAuth;
use Stripe\StripeClient;
use App\Notifications\AddReview;
<<<<<<< HEAD
=======
use Carbon\Carbon;
// use Illuminate\Notifications\Notification;
use Notification;
>>>>>>> 1d0024d92bae9c68ef6f7918537f485a300bc182

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '';
    protected $auth;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
        // $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'fname' => ['required', 'string', 'max:255'],
            'lname' => ['required', 'string', 'max:255'],
<<<<<<< HEAD
=======
            'username' => ['required', 'string', 'max:255'],
>>>>>>> 1d0024d92bae9c68ef6f7918537f485a300bc182
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            // 'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param array $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        //Stripe Customer ID Created..
        $stripe = new \Stripe\StripeClient(
            env('STRIPE_SK')
          );
         $stripe_data = $stripe->customers->create([
            'description' => strtolower($data['email']),
          ]);
        $user = User::create([
            'fname' => $data['fname'],
            'lname' => $data['lname'],
            'name' => $data['username'],
            'email' => strtolower($data['email']),
            'password' => Hash::make($data['password']),
            'guid' => $data['guid'],
            'customer_stripe_id' => $stripe_data->id,
        ]);
        $accountLink = StripeHelper::createAccountLink($user);

        return $user;
    }

    /**
     * @param Request $request
     * @throws \Throwable
     */
    public function register_(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $validator = $this->validator($request->all());
            if (!$validator->fails()) {
                // dd(ArrayHelper::merge($request->all(),['guid'=>GuidHelper::getGuid()]));

                event(new Registered($user = $this->create(ArrayHelper::merge($request->all(), ['guid' => GuidHelper::getGuid()]))));
              
//            $user = Auth::user();
//            $token = $user->createToken('Personal Access Token')->accessToken;
                return response()->json([
                    'success' => true,
//                'data' => $user,
                    'message' => "Please verify your email"
                ], 200);
            }
            return response()->json([
                'success' => false,
                'errors' => $this,
                'message' => $validator->getMessageBag()
            ], 401);
        });
    }
<<<<<<< HEAD

=======
    public function verifyOtp(Request $request){
        $validator = $this->RegisterValidator($request->all());
   
        if ($validator->fails()) {
            throw ValidationException::withMessages(['message' => "add All Feilds"]);
        }

        if (Otp::where('otp', $request->otp)->count() != 1) {
            throw ValidationException::withMessages(['message' => "Otp Is Incorrect"]);
        } 
        $optUser = Otp::where('otp','=',$request->get('otp'))->first();
        $passed_time = $optUser->created_at->format('H:i');
        $current_time = Carbon::now()->toTimeString();
         /*
        * Divide by 60 to get the difference in minutes
        * @difference shows in seconds
        */
        // return $difference/60;
        $difference = strtotime( $current_time ) - strtotime( $passed_time );
        $difference = $difference/60;
       
        if($difference > 25){
            return response()->json([
                'success' => false,
                'status' => 408,
                // 'errors' => $this,
                'message' => 'Your session has been Expired! Kindly Resend othe Code!'
            ], 408);
        }
        
        $user = User::where('email', strtolower($optUser->email))->first();
        $user->status = true;
        $user->email_verified_at = Carbon::now()->toDateTimeString();
        $user->update();
        
        Otp::where('email','=',strtolower($user->email))->delete();
        return $this->genericResponse(200, 'you have successfully Register.');
     
    }
    protected function RegisterValidator(array $data)
    {
        return  Validator::make($data,[
            'otp' => 'required',
        ]);
    }
>>>>>>> 1d0024d92bae9c68ef6f7918537f485a300bc182
    /**
     * @param Request $request
     * @throws \Throwable
     */
<<<<<<< HEAD
    public function register(Request $request)
=======
    public function register_(Request $request)
>>>>>>> 1d0024d92bae9c68ef6f7918537f485a300bc182
    {
        return DB::transaction(function () use ($request) {
            $validator = $this->validator($request->all());
            if (!$validator->fails()) {
                $data=ArrayHelper::merge($request->all(),['guid'=>GuidHelper::getGuid()]);
                $user = User::create([
                    'name' => $data['fname'] . $data['lname'],
                    'email' => strtolower($data['email']),
                    'password' => Hash::make($data['password']),
                    'guid' => $data['guid'],
                ]);
                //email will be add later after getting client email address
                // $user->notify(new AddReview($user));
                return response()->json([
                    'success' => true,
//                'data' => $user,
                    'message' => "Please verify your email"
                ], 200);
            }
            return response()->json([
                'success' => false,
                'errors' => $this,
                'message' => $validator->getMessageBag()
            ], 401);
        });
    }
}
