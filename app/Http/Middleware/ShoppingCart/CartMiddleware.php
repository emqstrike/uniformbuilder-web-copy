<?php

namespace App\Http\Middleware\ShoppingCart;

use App\ShoppingCart\Cart;
use App\ShoppingCart\User;
use Closure;

class CartMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        /*
            if has session for cart
                if session exceed
                    mark cart as abandon
                else
                    restart session time
            else
                set session for cart
         */

        if (\Session::has('cart_session'))
        {
            $cart_session = \Session::get('cart_session');
            $cart = Cart::findBySession($cart_session);

            if (!is_null($cart))
            {
                if (!$cart->exceedInLifeSpan())
                {
                    return $next($request);
                }
                else
                {
                    // todo: show message to user that the cart is already exceed on cart life span
                    \Log::info("Info: Cart already exceed on cart life span");
                }
            }
        }

        // $user = Auth::user(); uncomment this after
        $user = User::find(1); // remove this after

        $cart = Cart::takeCart($user);

        if (!is_null($cart))
        {
            \Session::set('cart_session', $cart->session);
            \Log::info("Info: Cart session " . $cart->session . " took of " . (is_null($user) ? "guest" : $user->getFullName()));

            return $next($request);
        }

        \Log::error("Error: Cart::takeCart return null.");
        die('Error: Cart::takeCart return null.');
    }
}
