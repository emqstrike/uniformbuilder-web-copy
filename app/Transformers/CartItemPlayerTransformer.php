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
            'thumbnail' => $cartItem->thumbnail,
            'players' => $cartItem->cartItemPlayers->toArray()
        ];
    }
}
