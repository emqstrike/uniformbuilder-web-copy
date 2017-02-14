<?php

namespace Customizer\Http\Middleware;

use Closure;
use Session;
use Redirect;

class VerifyAdministrationAccess
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
        if (Session::has('isLoggedIn') && Session::has('accountType'))
        {
            if (Session::get('isLoggedIn') && (Session::get('accountType') == 'administrator'))
            {
                return $next($request);
            }
        }

        return Redirect::to('administration/login');
    }
}
