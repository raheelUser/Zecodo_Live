<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class CommentsController extends Controller
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
        if(Auth::check()){
            return "ok";
        }else{
            return "not ok";
        }
        return Comment::join('products as products','comments.parent_id','=','products.id')
            ->with(['user'])
            // ->where('type', $request->get('type') == 1 ? Category::PRODUCT : Category::SERVICE)
            ->get([
                'products.id as productid',
                'products.name as product',
                'comments.*'
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
        $comment = new Comment();
        $comment->fill($request->all())->save();
        return response()->json([
            'message' => 'Comment added'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Comment $comment
     * @return Comment
     */
    public function show(Comment $comment)
    {
        return Comment::first();
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
