<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscriptions extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'subscriptions';
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';
     /**
     * @var array
     */
    protected $fillable = ['name', 'description', 'media_link', 'price', 'guid', 'active', 'created_at', 'updated_at'];

     /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function usersubscription()
    {
        return $this->hasMany(UserSubscription::class);
    }
}
