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
        $logged_in_token = $request->get('logged_in_token');
        $cart_session = $request->get('cart_session');
        
        if (!is_null($logged_in_token) && !is_null($cart_session))
        {
            $user = User::findByLoggedInToken($logged_in_token);

            // check if valid user using logged in token
            if (!is_null($user))
            {
                // check if authenticated user's cart is not empty
                if (!$user->carts()->validToUse()->get()->isEmpty())
                {
                    $user_carts = $user->carts()->validToUse()->get();

                    $cart = Cart::findBySession($cart_session);

                    if (!is_null($cart))
                    {
                        if ($cart->id == $user_carts->last()->id)
                        {
                            return $next($request);
                        }
                    }
                }
            }
        }

        return response()->json([
            'success' => false,
            'message' => "Unauthorized to access cart"
        ]);
    }
}