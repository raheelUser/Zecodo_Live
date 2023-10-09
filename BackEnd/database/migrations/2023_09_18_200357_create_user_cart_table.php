<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserCartTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_cart', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->float('price', 36);
            $table->float('quantity', 36);
            $table->text('attributes'); //protected $cast=['attributes'=>'array'] in model file;
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnUpdate();
            $table->foreign('product_id')->references('id')->on('products')->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_cart');
    }
}
