<?php

namespace App\Http\Middleware\ShoppingCart;

use App\ShoppingCart\Cart;
use App\ShoppingCart\CartItem;
use Closure;

class CartItemApiMiddleware
{
    /**
     * Middleware dependency
     * - CartApiMiddleware
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $cart_token = $request->get('cart_token');
        $cart = Cart::findByToken($cart_token);

        $cart_item_id = $request->get('cart_item_id');

        if (!is_null($cart_item_id))
        {
            $cart_item = CartItem::find($cart_item_id);

            if (!is_null($cart_item))
            {
                if (!is_null($cart_item->cart))
                {
                    if ($cart_item->cart->id == $cart->id)
                    {
                        return $next($request);
                    }
                }
            }
        }

        return response()->json([
            'success' => false,
            'message' => "Unauthorized to access cart item"
        ]);
    }
}
