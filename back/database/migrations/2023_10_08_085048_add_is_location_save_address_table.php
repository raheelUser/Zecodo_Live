<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsLocationSaveAddressTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('save_address', function (Blueprint $table) {
            $table->string('location')->nullable();
            $table->mediumText('google_address')->nullable();
            $table->uuid('guid')->unique();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('save_address', function (Blueprint $table) {
            //
        });
    }
}
