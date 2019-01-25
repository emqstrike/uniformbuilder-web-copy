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
            $table->bigIncrements('id');
            $table->bigInteger('material_id')->nullable()->default(null);
            $table->string('name', 50)->nullable()->default(null);
            $table->string('thumbnail')->nullable()->default(null);
            $table->smallInteger('quantity')->default(1);
            $table->double('total_price')->nullable()->default(null);
            $table->double('profit_amount')->nullable()->default(null);
            $table->double('total_profit_amount')->nullable()->default(null);
            $table->string('brand', 20)->nullable()->default(null);
            $table->bigInteger('item_id')->nullable()->default(null);
            $table->bigInteger('block_pattern_id')->nullable()->default(null);
            $table->string('neck_option')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->string('type', 10)->nullable()->default(null);
            $table->longText('builder_customization')->nullable()->default(null);
            $table->integer('set_group_id')->nullable()->default(null);
            $table->integer('factory_order_id')->nullable()->default(null);
            $table->string('design_sheet')->nullable()->default(null);
            $table->json('roster')->nullable()->default(null);
            $table->double('price')->nullable()->default(null);
            $table->string('applicationType')->nullable()->default(null);
            $table->string('additional_attachments')->nullable()->default(null);
            $table->string('notes')->nullable()->default(null);

            $table->bigInteger('cart_id')->nullable()->default(null);
            $table->timestamps();
        });

        Schema::table('cart_items', function(Blueprint $table) {
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
        Schema::drop('cart_items');
    }
}
