<?php

namespace App\ShoppingCart;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ["first_name", "last_name", "email", "password", "logged_in_token", "remember_token", "billing_id", "shipping_id"];

    public function carts()
    {
        return $this->hasMany("App\ShoppingCart\Cart");
    }

    public function getId()
    {
        return $this->id;
    }

    public function getFullName()
    {
        return $this->first_name . " " . $this->last_name;
    }

    public static function findByLoggedInToken($logged_in_token)
    {
        return static::where('logged_in_token', $logged_in_token)
                ->get()
                ->first();
    }
}
