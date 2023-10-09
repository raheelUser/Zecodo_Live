<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserCupon;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class UserCuponController extends Controller
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
        
        return UserCupon::with(['user'])
        ->with(['cupons'])
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

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $cupon = new UserCupon();
        $cupon->fill($request->all())->save();
        return response()->json([
            'message' => 'cupon added'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param UserCupon ID $id
     * @return UserCupon
     */
    public function show($id)
    {
        $cupon = UserCupon::where('id', $id)->first();
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
    /**
     * Count total Coupns of User.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function count()
    {
       return UserCupon::where('user_id', Auth::user()->id)->count();
    }
}
