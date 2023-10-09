<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Helpers\GuidHelper;

class CreateAddcategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('categories')->insert([
            [
                "name" => "Cell Phones",
                "description" => "Cell Phones",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Cars",
                "description" => "Cars",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Jewelry",
                "description" => "Jewelry",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Clothes",
                "description" => "Clothes",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Electronic",
                "description" => "Electronic",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Cultural",
                "description" => "Cultural",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Groceries & Pets",
                "description" => "Groceries & Pets",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Health & Beauty",
                "description" => "Health & Beauty",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Men's Fashion",
                "description" => "Men's Fashion",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Women's Fashion",
                "description" => "Women's Fashion",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Mother & Baby",
                "description" => "Mother & Baby",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Home & Lifestyle",
                "description" => "Home & Lifestyle",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Electronic Devices",
                "description" => "Electronic Devices",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Electronic Accessories",
                "description" => "Electronic Accessories",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "TV & Home Appliances",
                "description" => "TV & Home Appliances",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Watches, Bags & Jewellery",
                "description" => "Watches, Bags & Jewellery",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Sports & Outdoor",
                "description" => "Sports & Outdoor",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
            [
                "name" => "Mix Items",
                "description" => "Mix Items",
                "type" => "Product",
                "active" => true,
                "self_active" => true,
                "guid" => GuidHelper::getGuid(),
                "has_shipping" => true,
            ],
        ]);
        // Schema::create('addcategories', function (Blueprint $table) {
        //     $table->id();
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::dropIfExists('addcategories');
    }
}
