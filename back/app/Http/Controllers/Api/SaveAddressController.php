<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\City;
use App\Models\State;
use App\Models\SaveAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\GuidHelper;

class SaveAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       //return SaveAddress::orderBy('name')->limit(500)->get();
       //return DB::table('cities')->distinct()->get(['name']);
    }

    public function getState()
    {
        // dd('sss');
        return State::orderBy('id')->get();
    }

    public function getCityStatebyPostal($zipcode)
    {
        return Address::getDatabyApi($zipcode);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $saveAddress = new SaveAddress();
            $saveAddress->fill([
                'user_id' => \Auth::user()->id,
                'product_id' => '1',
                'guid' => GuidHelper::getGuid(),
                'fname' => $request->get("fname"),
                'lname' => $request->get("lname"),
                'country'=> $request->get("country"),
                'mobile'=> $request->get("mobile"),
                'company'=> $request->get("company"),
                'city'=> $request->get("city"),
                'isDefault'=> $request->get("isDefault"),
                'address'=> $request->get("address"),
                'city'=> $request->get("city"),
                'state'=> $request->get("state"),
                'zip' => $request->get("zip")
            ]);
            $saveAddress->save();
            return $saveAddress;
        });
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
            $saveAddress = new SaveAddress();
            $saveAddress->fill([
                'user_id' => \Auth::user()->id,
                'product_id' => '1',
                'guid' =>  GuidHelper::getGuid(),
                'fname' => $request->get("fname"),
                'lname' => $request->get("lname"),
                'country'=> $request->get("country"),
                'city'=> $request->get("city"),
                'mobile'=> $request->get("mobile"),
                'email'=> $request->get("email"),
                'company'=> $request->get("company"),
                'isDefault'=> $request->get("isDefault"),
                'address'=> $request->get("address"),
                'city'=> $request->get("city"),
                'state'=> $request->get("state"),
                'zip' => $request->get("zip")
            ]);
            $saveAddress->save();
            return $saveAddress;
        });
        
    }

    public function self(){
        return SaveAddress::where('user_id', '=', \Auth::user()->id)
        ->orderBy('id', 'desc')
        // ->where('isDefault', '=', true)
        ->get();
    }
    
    public function getDefault(){
        return SaveAddress::where('user_id', '=', \Auth::user()->id)
        ->where('isDefault', '=', true)
        // ->where('isDefault', '=', true)
        ->first();
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
        return DB::transaction(function () use ($request,$id) {
        //disable all addresses
            $disabledAddress = DB::table('save_address')
            ->update(['isDefault' => false]);
            $saveAddress =  SaveAddress::where('id', '=', $id)->update(['isDefault' => true]);
            return 'the Selected Address has been selected as Default';
       });
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $delete = SaveAddress::where('id', '=', $id)
        ->delete();
        if($delete){
            return "Address Delete";
        }
    }
}
