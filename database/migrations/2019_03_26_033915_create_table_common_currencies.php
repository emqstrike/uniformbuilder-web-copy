<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCommonCurrencies extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('common_currencies', function (Blueprint $table) {
            $table->increments('id');
            $table->string('symbol', 10)->nullable()->default(null);
            $table->string('name')->nullable()->default(null);
            $table->string('symbol_native', 10)->nullable()->default(null);
            $table->integer('decimal_digits')->nullable()->default(null);
            $table->integer('rounding')->nullable()->default(null);
            $table->string('code', 10)->nullable()->default(null);
            $table->string('name_plural')->nullable()->default(null);
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
        Schema::drop('common_currencies');
    }
}
