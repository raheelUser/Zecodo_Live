<?php

namespace App\Http\Controllers\Api;

use App\Helpers\GuidHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\JWTAuth;
class CategoryController extends Controller
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function index(Request $request)
    {
    
        /**
         * 
         * Raw Query for recursive Data
         */
        //  SELECT child.id AS child_id,
        // 	parent.name AS parent_name,
        //  child.name AS child_name,
        // 	parent.id AS parent_id
        // FROM categories child
        // JOIN categories parent
        //   ON child.parent_id = parent.id
               return Category::select(['id','parent_id', 'name', 'description'])
            ->where('parent_id', '=', null)
            ->where('active','=',true)
            // ->where('type', $request->get('type') == 1 ? Category::PRODUCT : Category::SERVICE)
            ->with(['childrenRecursive' => function (HasMany $hasMany) {
               $hasMany->select(['id', 'name', 'parent_id', 'guid']);
            }])
            ->get();
    }
	public function categoryActiveProduct(Request $request)
    { 
	
        $category = Category::select(['id', 'name', 'description'])
            ->with(['products'])
            ->where('active','=',true)
            // ->where('type', $request->get('type') == 1 ? Category::PRODUCT : Category::SERVICE)
            // ->with(['childrenRecursive' => function (HasMany $hasMany) {
            //    $hasMany->select(['id', 'name', 'parent_id']);
            // }])
            ->get();

           return $category;
    }
    public function categoryWithProduct(Request $request)
    { 
        return Category::select(['id', 'name', 'description'])
            // ->where('parent_id', '=', null)
            ->where('active','=',true)
            // ->where('type', $request->get('type') == 1 ? Category::PRODUCT : Category::SERVICE)
            ->with(['childrenRecursive' => function (HasMany $hasMany) {
               $hasMany->select(['id', 'name', 'parent_id']);
            }])
            ->get();
    }

    public function categoryforMain(Request $request)
    { 
        return Category::select(['id', 'name', 'description'])
            // ->where('parent_id', '=', null)
            ->where('active','=',true)
            // ->where('type', $request->get('type') == 1 ? Category::PRODUCT : Category::SERVICE)
            ->with(['childrenRecursive' => function (HasMany $hasMany) {
               $hasMany->select(['id', 'name', 'parent_id']);
            }])
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
        $category = new Category();
        $category->guid=GuidHelper::getGuid();
        $category->fill($request->all())->save();
        return response()->json([
            'message' => 'Category added'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Category $category
     * @return Category
     */
    public function show(Category $category)
    {
        return $category->loadMissing('attributes');
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

    public function productAttributes(Category $category)
    {
        return $category->categoryAttributes()
            ->with(['attribute', 'unitType'])
            ->get();
    }


    public function tabs(Request $request)
    {
        return Category::select(['id', 'name', 'description'])
            ->where('parent_id', '=', null)
            ->where($this->applyFilters($request))
            ->get()
            ->map(function ($category) {
                return [
                    'key' => "$category->id",
                    'tab' => $category->name
                ];
            });
    }
}
