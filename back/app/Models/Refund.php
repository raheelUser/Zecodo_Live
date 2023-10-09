<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Refund extends Model
{
    use HasFactory;
    const STATUS_PENDING = 'PENDING',
    STATUS_APPROVED = 'APPROVED',
    STATUS_REJECTED = 'REJECTED';
    protected $fillable = [
        'order_id',
        'reason',
        'comment',
        'status',
        'product_id',
    ];
    protected $casts = [
        'created_at'  => 'date:Y-m-d',
    ];
    public static function defaultSelect()
    {
        return ['id', 'order_id', 'product_id','status','reason','comment'];
    }
    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }
    public function order()
    {
        return $this->belongsTo(Order::class,'order_id');
    }
    public static function statuses() {
        return [
            self::STATUS_REJECTED,
            self::STATUS_APPROVED,
            self::STATUS_PENDING,
        ];
    }

}
