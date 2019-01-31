<?php

namespace App\ShoppingCart;

use App\ShoppingCart\Cart;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;

class User extends Model implements AuthenticatableContract
{
    use Authenticatable;

    protected $fillable = ["first_name", "last_name", "email", "password", "logged_in_token", "remember_token"];

    public function carts()
    {
        return $this->hasMany("App\ShoppingCart\Cart");
    }

    public function client_information()
    {
        return $this->hasOne("App\ShoppingCart\ClientInformation");
    }

    public function billing_information()
    {
        return $this->hasOne("App\ShoppingCart\BillingInformation");
    }

    public function shipping_information()
    {
        return $this->hasOne("App\ShoppingCart\ShippingInformation");
    }

    public function getId()
    {
        return $this->id;
    }

    public function getFullName()
    {
        return $this->first_name . " " . $this->last_name;
    }

    public function getValidCarts()
    {
        return $this->carts()->validToUse()->get();
    }

    public function hasMultipleCarts()
    {
        $valid_carts = $this->getValidCarts();

        if (!$valid_carts->isEmpty())
        {
            return $valid_carts->count() > 1;
        }

        return false;
    }

    public function mergeMyCarts(Cart $cart)
    {
        if ($this->hasMultipleCarts())
        {
            $cart->mergeFromValidCarts($this->getValidCarts());
        }
    }

    public function generateNewLoggedInToken()
    {
        $this->logged_in_token = uniqid();
        return $this->save();
    }

    public static function findByLoggedInToken($logged_in_token)
    {
        return static::where('logged_in_token', $logged_in_token)
                ->get()
                ->first();
    }
}
