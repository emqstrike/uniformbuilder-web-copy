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
            'id' => $cartItem->id,
            'players' => $cartItem->cartItemPlayers->toArray()
        ];
    }
}
