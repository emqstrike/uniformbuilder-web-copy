<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableInvoicePayments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_payments', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('invoice_id')->nullable()->default(null);
            $table->string('reference_number', 40)->nullable()->default(null);
            $table->double('amount_paid')->nullable()->default(null);
            $table->string('status', 20)->nullable()->default(null);
            $table->string('auth_code', 30)->nullable()->default(null);
            $table->string('error_code', 30)->nullable()->default(null);
            $table->json('result_data')->nullable()->default(null);
            $table->boolean('is_captured')->default(0);
            $table->boolean('is_voide')->default(0);
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
        Schema::drop('invoice_payments');
    }
}
