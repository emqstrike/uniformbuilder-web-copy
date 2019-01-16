<?php

namespace App\ShoppingCart;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    public function cart()
    {
        return $this->belongsTo('App\ShoppingCart\Cart');
    }
}
