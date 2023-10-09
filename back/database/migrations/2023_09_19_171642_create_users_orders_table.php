<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('orderid');
            $table->string('fname');
            $table->string('lname');
            $table->string('company')->nullable();
            $table->string('region');
            $table->string('address');
            $table->string('city');
            $table->string('state');
            $table->string('zip');
            $table->string('phone');
            $table->string('email');
            $table->string('shipping_rate');
            $table->string('order_notes')->nullable();
            $table->string('shipment_type');
            $table->string('shipment_track_id')->nullable();
            $table->jsonb('shipping_details')->nullable();
            $table->string('payment_status')->nullable();
            $table->float('Amount');
            $table->string('Curency')->nullable();
            $table->string('payment_intents')->nullable();
            $table->jsonb('Customer')->nullable();
            $table->string('payment_method_type')->nullable();
            $table->string('order_action')->nullable();
            $table->string('admin_note_type')->nullable();
            $table->unsignedBigInteger('buyer_id')->index();
            $table->unsignedBigInteger('shipping_detail_id')->nullable();
            $table->unsignedBigInteger('shipping_rate_id');
            $table->unsignedBigInteger('user_payments_id');
            $table->boolean('deliver_status')->default(false);
            $table->timestamp('delivered_at')->useCurrent();
            $table->boolean('status')->default(false);
            $table->string('admin_notes')->nullable();
            $table->foreign('buyer_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            // $table->foreign('shipping_rate_id')->references('id')->on('shiping_zone')->onDelete('cascade')->onUpdate('cascade');
            // $table->foreign('user_payments_id')->references('id')->on('user_payments')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('shipping_detail_id')->references('id')->on('shipping_details')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users_orders');
    }
}
