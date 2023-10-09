<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class UserSubscriptionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $value = request()->get('value');

        // return Subscription::where('email', 'ILIKE', "%{$value}%")
        //     ->distinct('email')
        //     ->orderBy('email')
        //     ->get();

       return UserSubscription::with(['user'])
       ->with(['subscription'])
        ->get();
    //    return DB::table('cities')->distinct()->get(['name']);
    }

    public function self()
    {
        // $value = request()->get('value');

        // return Subscription::where('email', 'ILIKE', "%{$value}%")
        //     ->distinct('email')
        //     ->orderBy('email')
        //     ->get();

       return UserSubscription::with(['user'])
       ->with(['subscription'])
       ->where('user_id', Auth::user()->id)
        ->get();
    //    return DB::table('cities')->distinct()->get(['name']);
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

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       //
       $subscription = new UserSubscription();
       $subscription->fill($request->all())->save();
       return response()->json([
           'message' => 'Subscriptions added'
       ]);
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
        //
    }

    public function unSubscribeCount(Request $request)
    {
        return UserSubscription::where('user_id', 14)
            ->where('unSubscribe', true)
            ->count();
    }

    public function SubscribeCount(Request $request)
    {
        return UserSubscription::where('user_id', 14)
            ->where('unSubscribe', false)
            ->count();
    }
    public function unSubscribe(Request $request, $id)
    {
        if (Auth::check()) {
            $subscription = UserSubscription::where('id', $id)->first();
            $usersubscription = UserSubscription::where('id', $id)->first();
            $usersubscription->update(["unSubscribe" => $request->get('unSubscribe')]);
            return response()->json([
                'message' => 'Subscriptions has been Unsubscribe!'
            ]);
        }else{
            return response()->json([
                'message' => 'You Are not Authorize!'
            ]);
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
        //
    }
}
