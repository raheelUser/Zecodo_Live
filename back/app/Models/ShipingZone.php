<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShipingZone extends Model
{
     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'shiping_zone';
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['zone_name', 'zone_regions', 'shipping_method', 'taxable', 'cost', 'created_at', 'updated_at'];

    public function orders()
    {
        return $this->hasOne(UserCart::class, 'shipping_rate_id');
    }
    public static function defaultSelect()
    {
        return [ 'id','zone_name', 'zone_regions', 'shipping_method', 'taxable', 'cost', 'created_at', 'updated_at'];
    }
}
