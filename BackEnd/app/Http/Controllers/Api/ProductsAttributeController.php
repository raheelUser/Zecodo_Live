<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductsAttribute;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ProductsAttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return ProductsAttribute::with(['attribute'])
       ->with(['product'])
       ->get();
    }

    public function self($guid)
    {
        $product = Product::where('guid', $guid)->first();
       return ProductsAttribute::
    //    join('products', 'products.id', '=', 'products_attributes.product_id')
    //    ->join('attributes', 'attributes.id', '=', 'products_attributes.attribute_id')
       where('product_id', '=', $product->id)
    //    ->with(['product'])
       ->with(['attribute'])
    //    where('guid', $guid)
    //    ->with(['productsAttributes'])
       ->get();
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
            'product_id' => ['required', 'string'],
            'attribute_id' => ['required', 'string'],
            // 'value' => ['required', 'string']
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
                $productsattribute = new ProductsAttribute();
                $productsattribute->fill($request->all())->save();
                return response()->json([
                    'success' => true,
                    'ProductsAttribute' => $productsattribute,
                    'message' => "Products Attribute has been Saved!"
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
            $productsattribute = ProductsAttribute::where('id', $id)
            ->update($request->all());
                return response()->json([
                'success' => true,
                'productsAttribute' => $productsattribute,
                'message' => "Products Attribute Updated"
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
            $productsattribute = ProductsAttribute::where('id', $id)->delete();
            return response()->json([
                'success' => true,
                'message' => "Products Attribute Deleted"
            ], 200);
        }
    }
}
