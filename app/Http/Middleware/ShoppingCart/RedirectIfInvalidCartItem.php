<?php

namespace App\Http\Middleware\ShoppingCart;

use App\ShoppingCart\Cart;
use Closure;

class RedirectIfInvalidCartItem
{
    /**
     * Middleware dependency
     * - RedirectIfInvalidCart
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $cart = Cart::findByToken(\Session::get('cart_token'));

        if (! $cart->cart_items->isEmpty())
        {
            $cart_items = $cart->cart_items;

            $is_valid = true;
            foreach ($cart_items as $cart_item) {
                if ($cart_item->cartItemPlayers->isEmpty())
                {
                    $is_valid = false;
                    break;
                }
            }

            if (! $is_valid)
            {
                \Session::put('danger', 'Please add player on empty cart item!');
                \Session::save();
                return redirect()->route("shopping-cart");
            }
        }
        else
        {
            \Session::put('danger', 'Your cart is empty!');
            \Session::save();
            return redirect()->route("shopping-cart");
        }

        return $next($request);
    }
}
