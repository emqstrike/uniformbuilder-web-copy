<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCartItems extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('cart_id');
            $table->bigInteger('product_id');
            $table->smallInteger('quantity')->default(1);
            $table->enum('type', ['upper', 'lower'])->default(null);
            $table->double('price')->nullable()->default(null);
            $table->double('total_price')->nullable()->default(null);
            $table->double('profit_amount')->nullable()->default(null);
            $table->double('total_profit_amount')->nullable()->default(null);
            $table->json('params')->nullable()->default(null);
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
        Schema::drop('cart_items');
    }
}
