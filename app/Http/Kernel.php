<?php

namespace App\Http;

use App\Http\Middleware\ShoppingCart\CartApiMiddleware;
use App\Http\Middleware\ShoppingCart\CartItemApiMiddleware;
use App\Http\Middleware\ShoppingCart\CartMiddleware;
use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * @var array
     */
    protected $middleware = [
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class,
    ];

    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'adminAccess' => \App\Http\Middleware\VerifyAdministrationAccess::class,
        'restrictedUserAccess' => \App\Http\Middleware\RedirectRestrictedUser::class,
        'disablePreventBack' => \App\Http\Middleware\DisablePreventBack::class,

        'cart_middleware' => CartMiddleware::class,
        'cart_api_middleware' => CartApiMiddleware::class,
        'cart_item_api_middleware' => CartItemApiMiddleware::class
    ];
}
