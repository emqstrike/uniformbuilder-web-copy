<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UniformOptionsOrigin extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('materials_options', function (Blueprint $table) {
            $table->enum('origin', array('web', 'ipad'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('materials_options', function (Blueprint $table) {
            Schema::drop('origin');
        });
    }
}
