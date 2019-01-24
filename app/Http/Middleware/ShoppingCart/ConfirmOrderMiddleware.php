<?php

namespace App\Http\Middleware\ShoppingCart;

use Closure;

class ConfirmOrderMiddleware
{
    /**
     * Redirect to shopping cart page if the client, billing and
     * shipping information are not set.
     *
     * Middleware dependency
     * - Authenticate
     * - CartMiddleware
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = \Auth::user();

        if (!is_null($user->client_information) && !is_null($user->billing_information) && !is_null($user->shipping_information))
        {
            return $next($request);
        }

        return redirect()->route('shopping-cart');
    }
}
