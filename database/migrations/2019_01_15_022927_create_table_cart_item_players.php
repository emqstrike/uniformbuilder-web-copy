<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCartItemPlayers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cart_item_players', function (Blueprint $table) {
            $table->increments('id');
            $table->smallInteger('size')->nullable()->default(null);
            $table->string('last_name')->nullable()->default(null);
            $table->string('number', 2)->nullable()->default(null);
            $table->smallInteger('quantity')->default(1);

            $table->bigInteger('cart_item_id')->nullable()->default(null);
            $table->timestamps();
        });

        Schema::table('cart_item_players', function(Blueprint $table) {
            $table->bigInteger('cart_item_id')->unsigned()->change();

            $table->foreign('cart_item_id')->references('id')->on('cart_items');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('cart_item_players');
    }
}
