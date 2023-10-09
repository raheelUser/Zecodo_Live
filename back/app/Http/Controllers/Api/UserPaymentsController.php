<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserPayments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class UserPaymentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return UserPayments::
        orderBy('card_type')->get();
       //return DB::table('cities')->distinct()->get(['name']);
    }

    public function self()
    {
       $user = Auth::user();
       return UserPayments::where('user_id', $user->id)->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return 'address';
    }

    protected function validator(array $data)
    {
       
        return Validator::make($data, [
            'card_type' => ['required', 'string'],
            'card_number' => ['required', 'string', 'max:19'],
            'expiry_date' => ['required', 'date'],
            'security_code' => ['required', 'string', 'max:4']
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
        return DB::transaction(function () use ($request) {
            $validator = $this->validator($request->all());
            // return $request->all();
            // die();
            if (!$validator->fails()) {

                $userpayments = new UserPayments();
                $userpayments->user_id =\Auth::user()->id;
                $userpayments->card_type =$request->get('card_type');
                $userpayments->card_type =$request->get('card_type');
                $userpayments->card_number=$request->get('card_number');
                $userpayments->expiry_date=$request->get('expiry_date');
                $userpayments->security_code=$request->get('security_code');
                $userpayments->set_default=$request->get('set_default');
                $userpayments->save();
                
                return "Payment Method has been Saved!";
                // return response()->json([
                //     'success' => true,
                //     'userpayments' => $userpayments,
                //     'message' => "Payment Method has been Saved!"
                // ], 200);
            }
            return  $validator->getMessageBag();
            // return response()->json([
            //     'success' => false,
            //     'errors' => $this,
            //     'message' => $validator->getMessageBag()
            // ], 401);
        });
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        if(Auth::check()){
            $userPayments = UserPayments::where('id', $id)
            ->update($request->all());
                return response()->json([
                'success' => true,
                'cart' => $userPayments,
                'message' => "Payments Updated"
                ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(Auth::check()){
            $userCart = UserPayments::where('id', $id)->delete();
            return "Payment Deleted";
            // return response()->json([
            //     'success' => true,
            //     'message' => "Payment Deleted"
            // ], 200);
        }
    }
}
