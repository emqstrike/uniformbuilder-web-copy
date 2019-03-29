<?php

namespace App\ShoppingCart;

use App\ShoppingCart\CartItem;
use Illuminate\Database\Eloquent\Model;

class CartItemPlayer extends Model
{
    protected $fillable = ["size", "last_name", "number", "price", "quantity", "cart_item_id"];

    public function cart_item()
    {
        return $this->belongsTo(CartItem::class);
    }
}
