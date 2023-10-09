<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscriptions;
use Illuminate\Http\Request;
use App\Helpers\GuidHelper;
use Illuminate\Support\Facades\DB;

class SubscriptionsController extends Controller
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

       return Subscriptions::where('active', true)
        ->orderBy('name')
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
       $subscription = new Subscriptions();
       $subscription->guid = GuidHelper::getGuid();
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
