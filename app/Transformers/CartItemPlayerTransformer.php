<?php

namespace App\Transformers;

use App\ShoppingCart\CartItem;
use League\Fractal\TransformerAbstract;

class CartItemPlayerTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(CartItem $cartItem)
    {
        return [
            'cart_item_id' => $cartItem->id,
            'material_id' => $cartItem->material_id,
            'name' => $cartItem->name,
            'images' => $cartItem->images(),
            'total_price' => (float) $cartItem->cart_item_players->sum('price'),
            'players' => $cartItem->cart_item_players->toArray()
        ];
    }
}
