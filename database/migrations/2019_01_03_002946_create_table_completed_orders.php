<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCompletedOrders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('completed_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('order_hash_id')->nullable()->default(null);
            $table->double('total_amount')->nullable()->default(null);
            $table->double('total_profit_amount')->nullable()->default(null);

            $table->bigInteger('cart_id')->nullable()->default(null);
            $table->timestamps();
        });

        Schema::table('completed_orders', function(Blueprint $table) {
            $table->bigInteger('cart_id')->unsigned()->change();

            $table->foreign('cart_id')->references('id')->on('carts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('completed_orders');
    }
}
