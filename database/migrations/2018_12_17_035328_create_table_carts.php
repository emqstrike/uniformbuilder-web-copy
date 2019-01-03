<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCarts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('user_id')->nullable()->default(null);
            $table->string('session_id')->nullable()->default(null);
            $table->boolean('is_active')->default(false);
            $table->boolean('is_cancelled')->default(false);
            $table->boolean('is_checkout')->default(false);
            $table->boolean('is_completed')->default(false);
            $table->boolean('is_abandoned')->default(false);
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
        Schema::drop('carts');
    }
}
