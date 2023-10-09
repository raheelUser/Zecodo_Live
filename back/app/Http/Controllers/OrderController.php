<?php

namespace App\Http\Controllers;

use App\Models\UserOrder;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('orders.index', ['orders' =>
            UserOrder::where('status', true)
                ->orderBy('created_at', 'DESC')
                ->paginate(10)]);
    }
}
