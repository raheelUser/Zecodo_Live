<?php

namespace App\Core;

use App\Helpers\GuidHelper;
use App\Helpers\StringHelper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * @property integer $id
 * @property string $name
 * @properties AttributesValue[] $attributesValues
 * @properties ProductAttribute[] $productAttributes
 * @mixin Builder
 */
class Base extends Model
{
    protected $autoBlame = true;
    protected $hasGuid = true;

    public static function boot()
    {
        parent::boot(); // TODO: Change the autogenerated stub
        static::creating(function (Base $baseModel) {

            if ($baseModel->hasGuid && empty($baseModel->guid)) {

                $baseModel->setAttribute('guid', GuidHelper::getGuid());
            }
            if ($baseModel->autoBlame) {
                if (empty($baseModel->created_by) || empty($baseModel->updated_by)) {
                    $baseModel->setAttribute('created_by', Auth::user()->id);
                    $baseModel->setAttribute('updated_by', Auth::user()->id);
                }
            }

            if (!empty($baseModel->name)) {
                $baseModel->name = StringHelper::lower($baseModel->name);
            }
        });
    }
}