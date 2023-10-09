<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserOrder extends Model
{
    const STATUS_UNPAID = 'UNPAID',
        STATUS_PAID = 'PAID',
        STATUS_REFUNDED = 'REFUNDED',
        DELIVERED = 'delivered',
        COMPLETED = 'completed';
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users_orders';
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = [
        'fname',
        'lname',
        'company',
        'region',
        'address',
        'city',
        'state',
        'zip',
        'phone',
        'email',
        'shipping_rate',
        'order_notes',
        'shipment_type',
        'shipment_track_id',
        'shipping_details',
        'payment_status',
        'Amount',
        'Curency',
        'payment_intents',
        'Customer',
        'payment_method_type',
        'buyer_id',
        'shipping_detail_id',
        'shipping_rate_id',
        'user_payments_id',
        'deliver_status',
        'delivered_at',
        'status',
        'admin_notes',
        'order_action',
        'admin_note_type',
        'orderid',
        'cartItems',
        'usr_cupons'
    ];
    protected $casts = [
        'created_at'  => 'date:Y-m-d',
    ];
    
    public function buyer()
    {
        return $this->belongsTo('App\Models\User', 'buyer_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function shippingDetail()
    {
        return $this->belongsTo('App\Models\ShippingDetail','shipping_detail_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }

    public function shippingrate()
    {
        return $this->belongsTo(ShipingZone::class, 'shipping_rate_id');
    }

    public function userpayments()
    {
        return $this->belongsTo(UserPayments::class, 'user_payments_id');
    }
    
    // 
    public static function statuses() {
        return [
            self::STATUS_UNPAID,
            self::STATUS_PAID,
            self::STATUS_REFUNDED
        ];
    }

}
