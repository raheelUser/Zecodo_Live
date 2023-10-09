<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserCupon extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'usercupon';
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';
     /**
     * @var array
     */
    protected $fillable = ['cupon_id', 'user_id', 'created_at', 'updated_at'];

     /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function cupons()
    {
        return $this->belongsTo('App\Models\Cupon','cupon_id');
    }
}
