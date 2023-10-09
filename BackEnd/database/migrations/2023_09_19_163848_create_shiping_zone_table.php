<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShipingZoneTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shiping_zone', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('zone_name');
            $table->string('zone_regions');
            $table->string('shipping_method');
            $table->boolean('taxable')->default(false);
            $table->float('cost', 36);
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
        Schema::dropIfExists('shiping_zone');
    }
}
