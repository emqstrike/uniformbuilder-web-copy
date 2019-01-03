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
            $table->increments('id');
            $table->bigInteger('user_id')->nullable()->default(null);
            $table->bigInteger('cart_id')->nullable()->default(null);
            $table->bigInteger('invoice_id')->nullable()->default(null);
            $table->double('total_amount')->nullable()->default(null);
            $table->double('total_profit_amount')->nullable()->default(null);
            $table->bigInteger('billing_id')->nullable()->default(null);
            $table->bigInteger('shipping_id')->nullable()->default(null);
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
        Schema::drop('completed_orders');
    }
}
