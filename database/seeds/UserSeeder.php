<?php

use App\ShoppingCart\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'id' => 645,
            'first_name' => "Rodrigo III",
            'last_name' => "Galura",
            'email' => "shinichiConan3rd@gmail.com",
            'password' => bcrypt("secret123"),
        ]);
    }
}
