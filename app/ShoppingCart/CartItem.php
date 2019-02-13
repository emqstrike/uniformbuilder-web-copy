<?php

namespace App\ShoppingCart;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = ["material_id", "name", "left_image", "front_image", "back_image", "right_image", "brand", "item_id", "block_pattern_id", "neck_option", "description", "type", "builder_customization", "design_sheet", "cart_id"];

    public function cart()
    {
        return $this->belongsTo('App\ShoppingCart\Cart');
    }

    public function cartItemPlayers()
    {
        return $this->hasMany('App\ShoppingCart\CartItemPlayer');
    }

    public function images()
    {
        $left_image = $this->left_image;
        $front_image = $this->front_image;
        $back_image = $this->back_image;
        $right_image = $this->right_image;

        return compact('left_image', 'front_image', 'back_image', 'right_image');
    }
}
