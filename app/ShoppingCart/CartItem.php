<?php

namespace App\ShoppingCart;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = ["material_id", "name", "thumbnail", "brand", "item_id", "block_pattern_id", "neck_option", "description", "type", "builder_customization", "design_sheet", "cart_id"];

    public function cart()
    {
        return $this->belongsTo('App\ShoppingCart\Cart');
    }

    public function cartItemPlayers()
    {
        return $this->hasMany('App\ShoppingCart\CartItemPlayer');
    }
}
