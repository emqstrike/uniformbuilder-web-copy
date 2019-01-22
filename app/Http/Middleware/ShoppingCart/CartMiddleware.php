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
            Cart Lifespan Flow
         */
        $this->cartLifespan();

        /*
            Cart Token Flow
         */
        return $this->cartToken($request, $next);
    }

    private function cartLifespan()
    {
        if (\Session::has('cart_timeout'))
        {
            if (!Cart::exceedInLifeSpan(\Session::get('cart_timeout')))
            {
                // reset cart timeout session
                \Session::put('cart_timeout', time());
                \Session::save();
            }
            else
            {
                // abandon the cart
                if (\Session::has('cart_token'))
                {
                    Cart::abandon(\Session::get('cart_token'));
                }

                \Session::remove('cart_timeout');
                \Session::save();

                \Log::warning("Warning: cart timeout session already exceed in cart lifespan");
                die;
            }
        }
        else
        {
            // define cart timeout session
            \Session::put('cart_timeout', time());
            \Session::save();
        }
    }

    private function cartToken($request, Closure $next)
    {
        // is cart token defined
        if (\Session::has('cart_token'))
        {
            $cart = Cart::findByToken(\Session::get('cart_token'));

            // is cart token valid
            if (!is_null($cart))
            {
                // is user authenticated
                if (\Auth::check())
                {
                    // has current cart owner
                    if ($cart->hasOwner())
                    {
                        // is user the owner of current cart
                        if ($cart->user->id !== \Auth::user()->id)
                        {
                            die("Error: You are unauthorized to access the cart " . $cart->id);
                        }
                    }
                    else
                    {
                        // assign current cart to authenticated user
                        $cart->assignToUser(\Auth::user()->id);
                    }

                    $user = \Auth::user();
                    if ($user->hasMultipleCarts())
                    {
                        $user->mergeMyCarts($cart);
                    }

                    \Log::debug('lagusan 2');
                    return $next($request);
                }
                elseif ($cart->hasOwner())
                {
                    die("Error: Cart " . $cart->id . " has already owner.");
                }

                \Log::debug('lagusan 3');
                return $next($request);
            }
        }

        $cart = Cart::takeCart();
        \Session::put('cart_token', $cart->token);
        \Session::save();

        if (\Auth::check())
        {
            $user = \Auth::user();

            $cart->assignToUser($user->id);

            $user->mergeMyCarts($cart);
        }

        \Log::debug('lagusan 4');
        return $next($request);
    }
}
