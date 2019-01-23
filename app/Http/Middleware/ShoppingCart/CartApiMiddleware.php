<?php

namespace App\Http\Middleware\ShoppingCart;

use App\ShoppingCart\Cart;
use App\ShoppingCart\CartItem;
use App\ShoppingCart\User;
use Closure;

class CartApiMiddleware
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
        $cart_token = $request->get('cart_token');
        $logged_in_token = $request->get('logged_in_token');

        $user = User::findByLoggedInToken($logged_in_token);
        $is_user_authenticated = !is_null($user);

        // is cart token defined
        if (!is_null($cart_token))
        {
            $cart = Cart::findByToken($cart_token);

            // is cart token valid
            if (!is_null($cart))
            {
                // is user authenticated
                if ($is_user_authenticated)
                {
                    // has current cart owner
                    if ($cart->hasOwner())
                    {
                        // is user not the owner of current cart
                        if ($cart->user->id === $user->id)
                        {
                            \Log::debug('lagusan api 1');
                            return $next($request);
                        }
                    }

                    goto unauthorized;
                }
                elseif ($cart->hasOwner())
                {
                    goto unauthorized;
                }

                \Log::debug('lagusan api 2');
                return $next($request);
            }
        }

        unauthorized:
        return response()->json([
            'success' => false,
            'message' => "Unauthorized to access cart"
        ]);
    }
}