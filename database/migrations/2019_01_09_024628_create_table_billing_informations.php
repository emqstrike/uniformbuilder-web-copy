<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableBillingInformations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('billing_informations', function (Blueprint $table) {
            $table->increments('id');
            
            $table->string('full_name')->nullable()->default(null);
            $table->string('athletic_director')->nullable()->default(null);
            $table->string('email')->nullable()->default(null);
            $table->string('phone_number', 10)->nullable()->default(null);
            $table->string('fax')->nullable()->default(null);

            $table->string('city')->nullable()->default(null);
            $table->string('state', 20)->nullable()->default(null);
            $table->string('zip', 10)->nullable()->default(null);
            $table->bigInteger('user_id')->nullable()->default(null);
            $table->timestamps();
        });

        Schema::table('billing_informations', function(Blueprint $table) {
            $table->bigInteger('user_id')->unsigned()->change();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('billing_informations');
    }
}
