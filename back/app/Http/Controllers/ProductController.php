<?php

namespace App\Http\Controllers;

use App\Helpers\GuidHelper;
use App\Helpers\ArrayHelper;
use App\Helpers\StringHelper;
use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Media;
use App\Models\User;
use App\Models\Attribute;
use App\Models\Product;
use App\Models\Order;
use App\Models\ProductsAttribute;
use App\Models\ProductsCategories;
use App\Scopes\ActiveScope;
use App\Scopes\SoldScope;
use App\Notifications\AdApproved;
use App\Notifications\AdRejected;
use App\Notifications\OfferStatusNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function PHPUnit\Framework\isEmpty;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;

use Image;

class OfferStatus
{
    public $email;
    public $name;
    public $status;
    public function routeNotificationFor()
    {
        return $this->requester->email;
    }
}
class ProductController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('products.index', [
            'products' => Product::where('active', true)->where('IsSaved',true)->paginate(10)
        ]);
    }

    public function inActive()
    {
        // $inActiveProduct = Product::where('active', false)->where('IsSaved',true)->paginate(10);
        // echo "<pre />";
        // print_r($inActiveProduct);
        // die();
        // // dd($inActiveProduct);
        // // $inActiveProduct = ProductsCategories::with('products')
        // //     ->whereHas('products', function ($query) {
        // //         $query->where('active', false);
        // //     })->where('IsSaved',true)->orderBy('created_at', 'ASC')->paginate(10);
        // return view('products.in-active', ['products' => $inActiveProduct]);
                                                        // return Product::where('active', false)
                                                        // ->where('IsSaved',true)
                                                        // ->orderBy('created_at', 'DESC')
                                                        // ->paginate(10); 
        return view('products.in-active ', [
            'products' => Product::where('active', false)
            ->where('IsSaved',true)
            ->orderBy('created_at', 'DESC')
            ->paginate(10)
        ]);
        // view('products.in-active', ['product' =>
        // Product::where('active', false)
        //     ->where('IsSaved',true)
        //     ->orderBy('created_at', 'DESC')
        //     ->paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('products.create', ['categories' => Category::where('active', true)->with('attributes')->get()]);
    }

    public function search(Request $request)
    {
        $search = $request->get('search');
        $products = Product::withoutGlobalScope(ActiveScope::class)
            ->withoutGlobalScope(SoldScope::class)
            ->where('name', 'ilike', '%' . $search . '%')
            ->where('IsSaved',true)
            ->paginate(15);
        return view('products.index', ['products' => $products]);
    }

    public function searchInActive(Request $request)
    {
        $search = $request->get('search');
        $products = Product::withoutGlobalScope(ActiveScope::class)
        ->withoutGlobalScope(SoldScope::class)
        ->where('name', 'like', '%' . $search . '%')
        ->where('active', false)
        ->where('IsSaved',true)
        ->paginate(15);
        // dd($products);
        // $products = Product::where('active', false)->where('name', 'like', '%' . $search . '%')->paginate(10);
        // $products = ProductsCategories::with('products')
        //     ->whereHas('products', function ($query) use ($search) {
        //         $query->where('active', false)->where('name', 'like', '%' . $search . '%');
        //     })->withoutGlobalScope(ActiveScope::class)
        //     ->withoutGlobalScope(SoldScope::class)->paginate(10);
        return view('products.in-active', ['products' => $products]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
       // dd($request->all());
        DB::transaction(function () use ($request) {
            $product = new Product();
            $product->guid = GuidHelper::getGuid();
            $request['user_id'] = auth()->user()->getAuthIdentifier();
            $product->fill(ArrayHelper::merge($request->all(),
                [
                    'status' => 'DRAFT',
                    'IsSaved'=>true,
					//'featured' => $request->get('featured'),
                ]
            ))->save();
			  // $product->fill($request->all())->save();
            if($request->hasFile('image')) {

                $file =$request->file('image');
                $extension = $file->getClientOriginalExtension();
                $guid = GuidHelper::getGuid();
                $path = Product::getUploadPath($product->id);//. StringHelper::trimLower(Media::PRODUCT_IMAGES);
                $name = "{$path}/{$guid}.{$extension}";
                // $name = "{$path}/guid}.{$extension}";
               
                $media = new Media();
                $media->fill([
                    'name' => $name,
                    'extension' => $extension,
                    'type' => Media::PRODUCT_IMAGES,
                    'user_id' => \Auth::user()->id,
                    'product_id' => $product->id,
                    'active' => true,
                ]);
    
                $media->save();
                $image = Image::make($request->file('image'));
                // $storage = Storage::put('public/'. $name, $image->encode());
                // $storage =  \Storage::disk('local')->put('public/'. $path .'/'.$name, $image, 'public');
                // $storage =  \Storage::disk('local')->put('public/'. $path .'/'.$name, $image);
                $storage = Storage::disk('local')->put('public/'.$name, $image );

                // $storage = Storage::disk('local')->put($name, $image);
                // Storage::putFileAs(
                //         'public/' . $path,
                //         $image,
                //         "{$guid}.{$extension}"
                //     );
                // Storage::put('public/'. $path, $image, 'public');
                // Storage::disk('local')->put('public/'. $path .'/'.$name, $image, 'public');
                // Storage::putFileAs(
                //     'public/' . $path,
                //     $image,
                //     "{$guid}.{$extension}"
                // );

                // $image = Image::make($request->file('image'));
                // /**
                //  * Main Image Upload on Folder Code
                //  */
                // $imageName = time().'-'.$request->file('image')->getClientOriginalName();
                // $destinationPath = public_path('image/');
                // // $image->resize(1024,1024);
                // $image->resize(1024, 1024, function ($constraint) {
                //     $constraint->aspectRatio();
                //     $constraint->upsize();
                // });
                // $abc = $image->save($destinationPath.$imageName);
            }   
            // $product->fill($request->all())->save();
            if($request->hasFile('image')) {

                $file =$request->file('image');
                $extension = $file->getClientOriginalExtension();
                $guid = GuidHelper::getGuid();
                $path = Product::getUploadPath($product->id);//. StringHelper::trimLower(Media::PRODUCT_IMAGES);
                $name = "{$path}/{$guid}.{$extension}";
                // $name = "{$path}/guid}.{$extension}";
               
                $media = new Media();
                $media->fill([
                    'name' => $name,
                    'extension' => $extension,
                    'type' => Media::PRODUCT_IMAGES,
                    'user_id' => \Auth::user()->id,
                    'product_id' => $product->id,
                    'active' => true,
                ]);
    
                $media->save();
                $image = Image::make($request->file('image'));
                // $storage = Storage::put('public/'. $name, $image->encode());
                // $storage =  \Storage::disk('local')->put('public/'. $path .'/'.$name, $image, 'public');
                // $storage =  \Storage::disk('local')->put('public/'. $path .'/'.$name, $image);
                $storage = Storage::disk('local')->put('public/'.$name, $image );

                // $storage = Storage::disk('local')->put($name, $image);
                // Storage::putFileAs(
                //         'public/' . $path,
                //         $image,
                //         "{$guid}.{$extension}"
                //     );
                // Storage::put('public/'. $path, $image, 'public');
                // Storage::disk('local')->put('public/'. $path .'/'.$name, $image, 'public');
                // Storage::putFileAs(
                //     'public/' . $path,
                //     $image,
                //     "{$guid}.{$extension}"
                // );

                // $image = Image::make($request->file('image'));
                // /**
                //  * Main Image Upload on Folder Code
                //  */
                // $imageName = time().'-'.$request->file('image')->getClientOriginalName();
                // $destinationPath = public_path('image/');
                // // $image->resize(1024,1024);
                // $image->resize(1024, 1024, function ($constraint) {
                //     $constraint->aspectRatio();
                //     $constraint->upsize();
                // });
                // $abc = $image->save($destinationPath.$imageName);
            }   

            // $attributes = [];
            // foreach ($request->get('attributes', []) as $id => $value) {
            //     $attributes[] = [
            //         'attribute_id' => $id,
            //         'product_id' => $product->id,
            //         'value' => $value
            //     ];
            // }

            // ProductsAttribute::insert($attributes);
        });
        return redirect('admin/products')->with('success', 'Product Added');
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // $media =  Media::where('product_id',$id)->first();
        return view('products.edit', [
            'product' => Product::with('category')->withoutGlobalScope(ActiveScope::class)
                ->withoutGlobalScope(SoldScope::class)->findOrFail($id),
            'category' => Category::where('active', true)->get(),
            'media' =>Media::where('product_id',$id)->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        if ($request->get('activateOne') == "activateOnlyOne") {
           
            $product->update(['active' => !empty($request->get('checkbox')), 'in_review' => false]);
            $user = User::where('id', $product->user_id)->first();
            $offer_status = new OfferStatus();
            $offer_status->email = $user->email;
            $offer_status->name = $user->name;
            $offer_status->status = $request->get('checkbox') ? 1 : 0;
            if(!empty($request->get('checkbox'))){
                if($request->get('checkbox') == true){
                    $notify =  $user->notify(new AdApproved($offer_status, $product));
                }
            }else{
                if($request->get('checkbox') == false){
                    $notify =  $user->notify(new AdRejected($offer_status, $product));
                }
            }
            return back()->with('success', "{$product->name} Status Changed Successfully.");
        } else {
            
            $product->fill($request->all())->update();
            $product->in_review = false;
            $product->featured = $request->get('featured');
			//
            $product->update();
            //  ProductsCategories::where('product_id', $product->id)->update(['category_id' => $request->category_id]);
            $attributes = $request->get('attributes', []);
            // @TODO: create relations to avoid where query
            ProductsAttribute::where('product_id', $product->id)
                ->get()
                ->each(function (ProductsAttribute $attribute) use ($attributes) {
                    $attribute->value = $attributes[$attribute->attribute_id];
                    $attribute->save();
                });
            $user = User::where('id', $product->user_id)->first();
            $offer_status = new OfferStatus();
            $offer_status->email = $user->email;
            $offer_status->name = $user->name;
            $offer_status->status = $request->get('status') ? 1 : 0;
            if($request->get('status') == true){
                $notify =  $user->notify(new AdApproved($offer_status, $product));
            }
            return redirect('admin/products')->with('success', 'Product Updated');
        }
    }
    public function showAttributes(Product $product)
    {
        
        return view('products.add-properties',
            [  'product' => $product,
                'attributes' => Attribute::getAll()->get()
            ]
        );
    }

    
    public function activateAll()
    {

        Product::query()->withoutGlobalScope(ActiveScope::class)
            ->withoutGlobalScope(SoldScope::class)->update(['active' => 1]);
        return back()->with('success', 'All Products Activated');
    }
 	public function showAttributesList(Product $product)
    {
        return view('products.show-properties', ['product' => $product]);
    }

    public function addAttributes(Product $product, Request $request)
    {
        $productAttributes = new ProductsAttribute($request->all());

        $product->productAttributes()->saveMany([$productAttributes]);
        // return back()->with('success', 'All Categories Activated');
        return view('products.show-properties', ['product' => $product]);
    }

    public function deleteProductAttribute($id)
    {
        $productAttribute = ProductsAttribute::where('id',$id)->first();
        $product = Product::where('id',$productAttribute->product_id)->first();
        ProductsAttribute::where('id',$id)
        ->delete();
        return view('products.show-properties', ['product' => $product]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return back()->with('success', 'Product Deleted');
    }
}
