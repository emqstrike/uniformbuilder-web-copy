<?php

namespace App\Http\Middleware\ShoppingCart;

use Closure;

class SessionFlashMiddleware
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
        $session_flashes = ["success", "danger"];

        foreach ($session_flashes as $flash) {
            if (in_array($flash, array_keys(\Session::all())))
            {
                $request->merge([$flash => \Session::get($flash)]);

                \Session::remove($flash);
                \Session::save();
            }
        }

        return $next($request);
    }
}
