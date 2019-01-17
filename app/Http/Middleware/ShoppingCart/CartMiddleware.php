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
                if (!$cart->exceedInLifeSpan(\Session::get('cart_timeout')))
                {
                    // reset cart timeout
                    \Session::set('cart_timeout', time());

                    // assign cart to authenticated user
                    if ($cart->hasNoUser() && \Auth::check())
                    {
                        $cart->assignToUser(\Auth::user()->id);
                    }

                    return $next($request);
                }
                else
                {
                    $cart->markAsAbandoned();
                    \Session::remove('cart_session');
                    \Session::remove('cart_timeout');

                    // todo: show message to user that the cart is already exceed on cart life span
                    \Log::info("Info: Cart already exceed on cart life span");

                    return redirect($request->url());
                }
            }
        }

        // $user = \Auth::check() ? \Auth::user() : null;
        $user = User::find(1);

        $cart = Cart::takeCart($user);

        if (!is_null($cart))
        {
            \Session::set('cart_session', $cart->session);
            \Session::set('cart_timeout', time());

            \Log::info("Info: Cart session " . $cart->session . " took of " . (is_null($user) ? "guest" : $user->getFullName()));

            return $next($request);
        }

        \Log::error("Error: Cart::takeCart return null.");
        die('Error: Cart::takeCart return null.');
    }
}
