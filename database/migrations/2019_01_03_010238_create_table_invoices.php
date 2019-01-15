<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableInvoices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('invoice_code', 30)->nullable()->default(null);
            $table->string('invoice_url')->nullable()->default(null);

            $table->bigInteger('completed_order_id')->nullable()->default(null);
            $table->timestamps();
        });

        Schema::table('invoices', function(Blueprint $table) {
            $table->bigInteger('completed_order_id')->unsigned()->change();

            $table->foreign('completed_order_id')->references('id')->on('completed_orders');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('invoices');
    }
}
