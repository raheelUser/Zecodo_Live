<?php

namespace App\Models;

use App\Core\Base;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * App\Models\Media
 *
 * @property integer $id
 * @property integer $user_id
 * @property string $name
 * @property string $extension
 * @property string $type
 * @property boolean $active
 * @property boolean $system
 * @property string $guid
 * @property string $created_at
 * @property string $updated_at
 * @property User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Media newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Media newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Media query()
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereExtension($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereGuid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereSystem($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereUserId($value)
 * @mixin \Eloquent
 */
class Media extends Base
{
    protected $autoBlame = false;
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['user_id', 'name', 'extension', 'type', 'active', 'system', 'guid', 'product_id', 'service_id', 'provider_id', 'created_at', 'updated_at'];

    /**
     * @var array Append url
     */
    protected $appends = ['url'];
    /**
     * @var
     */
    protected $visible = ['url', 'id', 'name', 'guid', 'product_id', 'provider_id'];

    public const USER_IMAGES = "USER";
    public const PRODUCT_IMAGES = "PRODUCT";
    public const SERVICE_IMAGES = "SERVICE";
    public const TRUSTEDSELLER_FILES = "TRUSTEDSELLER";

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function getUrlAttribute()
    {
        return url(Storage::url($this->name));
    }

}
