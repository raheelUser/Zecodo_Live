<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Prices
 * 
 * @property integer $id
 * @property string $name
 * @property string $value
 * @property string $created_at
 * @property bool $active
 * @mixin \Eloquent
 */
class UserMyMessages extends Model
{
    const EMAIL = "email";
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';
    /**
     * @var array
     */
    protected $fillable = ['sender_id', 'recipent_id', 'guid', 'profile_url', 'subject'
                        ,'data', 'read_at', 'read', 'read_by', 'type', 'created_by', 'updated_by'];
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    
    public function senderMessage()
    {
        return $this->belongsTo('App\Models\User', 'sender_id');
    }

    public function recipentMessage()
    {
        return $this->belongsTo('App\Models\User', 'recipent_id');
    }

    public function readByMessage()
    {
        return $this->belongsTo('App\Models\User', 'read_by');
    }

}
