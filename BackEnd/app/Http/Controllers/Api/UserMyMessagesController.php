<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserMyMessages;
use Illuminate\Http\Request;
use App\Helpers\GuidHelper;
use Carbon\Carbon;
class UserMyMessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $value = request()->get('value');

        // return Subscription::where('email', 'ILIKE', "%{$value}%")
        //     ->distinct('email')
        //     ->orderBy('email')
        //     ->get();

       return UserMyMessages::with(['senderMessage'])
       ->with(['recipentMessage'])
       ->with(['readByMessage'])
       ->get();
    //    return DB::table('cities')->distinct()->get(['name']);
    }
    public function unread($id)
    {
        return UserMyMessages::with(['senderMessage'])
        ->with(['recipentMessage'])
        ->with(['readByMessage'])
        ->where('recipent_id', $id)
        ->where('read', false)
        ->get();
        // Auth::user()->id ? Auth::user()->id
    }
    public function self($id)
    {
        return UserMyMessages::with(['senderMessage'])
        ->with(['recipentMessage'])
        ->with(['readByMessage'])
        ->where('recipent_id', $id)
        ->where('read', true)
        ->get();
        // Auth::user()->id ? Auth::user()->id
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
       // validation on recipient id

       $message = new UserMyMessages();
       $message->sender_id = $request->get('sender_id');//\Auth::user()->id;
       $message->recipent_id = $request->get('recipent_id');
       $message->guid = GuidHelper::getGuid();
       $message->subject = $request->get('subject');
       $message->profile_url= UserMyMessages::EMAIL;
       $message->type= UserMyMessages::EMAIL;
       $message->created_by= $request->get('sender_id');//\Auth::user()->id;
       $message->data = $request->get('message');
       $message->save();

    //    MessageReceived::trigger($user, $chat_id);

       return $this->genericResponse(true, 'Message sent successfully.');
    }

    public function read(Request $request, $guid)
    {
       // validation on recipient id

       $message = new UserMyMessages();
       $message->where('guid', $guid)->update(
        [
            'read' => true,
            'read_by' => 14,
            'read_at' => Carbon::now()->toDateTimeString()
        ]);
       

    //    MessageReceived::trigger($user, $chat_id);

       return $this->genericResponse(true, 'Message has been Read.');
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
