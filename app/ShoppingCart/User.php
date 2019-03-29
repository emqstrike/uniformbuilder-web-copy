<?php

namespace App\ShoppingCart;

use App\ShoppingCart\BillingInformation;
use App\ShoppingCart\Cart;
use App\ShoppingCart\ClientInformation;
use App\ShoppingCart\ShippingInformation;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;

class User extends Model implements AuthenticatableContract
{
    use Authenticatable;

    protected $fillable = ["first_name", "last_name", "email", "password", "logged_in_token", "remember_token"];

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    public function client_information()
    {
        return $this->hasOne(ClientInformation::class);
    }

    public function billing_information()
    {
        return $this->hasOne(BillingInformation::class);
    }

    public function shipping_information()
    {
        return $this->hasOne(ShippingInformation::class);
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
        $this->logged_in_token = uniqid($this->id . "_");
        return $this->save();
    }

    public static function findByLoggedInToken($logged_in_token)
    {
        return static::where('logged_in_token', $logged_in_token)
                ->get()
                ->first();
    }

    public static function findByEmail($email)
    {
        return static::where('email', $email)->first();
    }
}
