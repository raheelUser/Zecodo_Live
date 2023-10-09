<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPayments extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_payments';
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';
     /**
     * @var array
     */
    protected $fillable = ['card_type', 'user_id', 'card_number',
         'expiry_date', 'security_code', 'set_default', 'created_at', 'updated_at'];

     /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function userpayments()
    {
        return $this->hasOne(UserCart::class, 'user_payments_id');
    }

    public function orders()
    {
        return $this->hasOne(UserCart::class, 'user_payments_id');
    }
    // protected $cast=['attributes'=>'array'];
    public static function defaultSelect()
    {
        return [ 'id','card_type', 'card_number', 'expiry_date', 'created_at', 'updated_at'];
    }
}
