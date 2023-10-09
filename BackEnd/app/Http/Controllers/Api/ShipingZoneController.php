<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShipingZone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ShipingZoneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return ShipingZone::
        orderBy('zone_name')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //return 'address';
    }

    protected function validator(array $data)
    {
       
        return Validator::make($data, [
            'zone_name' => ['required', 'string'],
            'zone_regions' => ['required', 'string'],
            'shipping_method' => ['required', 'string'],
            'taxable' => ['required', 'bool'],
            'cost' => ['required', 'integer']
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
            if (!$validator->fails()) {
                $shipingzone = new ShipingZone();
                $shipingzone->fill($request->all())->save();
                return response()->json([
                    'success' => true,
                    'shipingzone' => $shipingzone,
                    'message' => "Shiping Zone has been Saved!"
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
            $shipingzone = ShipingZone::where('id', $id)
            ->update($request->all());
                return response()->json([
                'success' => true,
                'shipingzone' => $shipingzone,
                'message' => "Shiping Zone Updated"
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
            $shipingzone = ShipingZone::where('id', $id)->delete();
            return response()->json([
                'success' => true,
                'message' => "Shiping Zone Deleted"
            ], 200);
        }
    }
}
