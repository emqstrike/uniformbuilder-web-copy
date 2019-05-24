<?php

namespace App\Http\Middleware;

use Closure;
use Session;
use Redirect;

class AccessSavedDesigns
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
        if (Session::has('accessSavedDesigns'))
        {
            if (Session::get('accessSavedDesigns') == config('customizer.access_saved_designs'))
            {
                return $next($request);
            }
        }
        return Redirect::to('saved_design/login');
    }
}
