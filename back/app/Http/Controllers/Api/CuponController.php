<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cupon;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use App\Helpers\GuidHelper;
use Illuminate\Support\Facades\Auth;
class CuponController extends Controller
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function index(Request $request)
    {
        /**
         * Raw Query for recursive Data
         */
        //  SELECT child.id AS child_id,
        // 	parent.name AS parent_name,
        //  child.name AS child_name,
        // 	parent.id AS parent_id
        // FROM categories child
        // JOIN categories parent
        //   ON child.parent_id = parent.id
        
        return Cupon::get();
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
        $cupon = new Cupon();
        $cupon->guid = GuidHelper::getGuid();
        $cupon->fill($request->all())->save();
        return response()->json([
            'message' => 'cupon added'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Cupon id $id
     * @return Cupon
     */
    public function show($id)
    {
        $cupon = Cupon::where('id', $id)->first();
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
