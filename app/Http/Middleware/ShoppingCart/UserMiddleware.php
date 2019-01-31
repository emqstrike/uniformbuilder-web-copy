<?php

namespace App\Http\Middleware\ShoppingCart;

use Closure;

class UserMiddleware
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
        if (\Session::get('isLoggedIn'))
        {
            return $next($request);
        }

        return redirect()->route('shopping-cart');
    }
}
