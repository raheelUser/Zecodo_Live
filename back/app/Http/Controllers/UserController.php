<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use App\Models\TrustedSeller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('trusted-seller.index', ['user' =>
        User::join('trusted_sellers', 'users.id', '=', 'trusted_sellers.user_id')
              ->orderBy('trusted_sellers.created_at', 'ASC')
            ->get()
        ]);
    }

    public function get()
    {
        return view('user.index', ['user' =>
        User::orderBy('id', 'DESC')
            ->get()
        ]);
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
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return view('user.detail', ['user' =>
        User::where('id', $id)
            ->first()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        $user = User::where('id', $id);
        $user->update(["isTrustedSeller" => $request->get('status')]);
        return back()->with('success', "Status Changed");
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
        
        // $user = User::where('id', $id);
        // $user->update($request->all());
        // return back()->with('success', "Updated");  
    }
    public function updateUser(Request $request, $id)
    {
        $user = User::where('id', $id);
        if($request->get('status') == 1){
            $user->update(["phone" => $request->get('phone'), "status" => $request->get('status') , "softdelete" => false]);
        }else if($request->get('status') == 0){
            $user->update(["phone" => $request->get('phone'), "status" => $request->get('status')]);
        }
        $user->update(["is_autoAdd" => $request->get('is_autoAdd')]);

        return back()->with('success', "Updated");  
    }

    public function changeUser(Request $request, $id)
    {
       $user = TrustedSeller::where('user_id', $id);
       $user->update(["percentage" => $request->get('percentage')]);
       return back()->with('success', "Updated");
    }
    public function changeUserStatus($id){
        // DB::update('update users set softdelete = ? where id = ?',[false,$id]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(USer $user)
    {
        $user->delete();
        // Service::where('user_id', $user->id)->delete();
        // Product::where('user_id', $user->id)->delete();
        return back()->with('success', 'User Deleted');
    }

    //this will show products associated with the user
    public function showUserProducts(User $user, Request $request)
    {
        $userProducts = User::with('products')->where('id', $user->id)->first();
        return view('customer.user-products', ['customer' => User::where('id', $user->id)->first(), 'customerProduct' => $userProducts->products,
            'active' => Product::where('user_id', $user->id)->select(['active'])->first()]);
    }

    public function showUserServices(User $user, Request $request)
    {
        $userServices = User::with('services')->where('id', $user->id)->first();
        return view('customer.user-services', ['customer' => User::where('id', $user->id)->first(), 'customerServices' => $userServices->services,
            'active' => Service::where('user_id', $user->id)->select(['active'])->first()]);
    }

    public function activateAllProducts(Request $request, User $user)
    {
        Product::where('user_id', $user->id)->update(['active' => $request->get('checkbox')]);
        return back()->with('success', "All Products Activated Of this user {$user->name}");
    }

    public function activateAllServices(Request $request, User $user)
    {
        Service::where('user_id', $user->id)->update(['active' => $request->get('checkbox')]);
        return back()->with('success', "All Services Activated Of this user {$user->name}");
    }

}
