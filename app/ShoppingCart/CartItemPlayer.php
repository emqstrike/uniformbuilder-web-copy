<?php

namespace App\ShoppingCart;

use Illuminate\Database\Eloquent\Model;

class CartItemPlayer extends Model
{
    protected $fillable = ["size", "last_name", "number", "price", "quantity", "cart_item_id"];
}
