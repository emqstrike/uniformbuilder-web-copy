<?php

Route::get('remote-login/{token?}', 'AuthenticationController@remoteLogin');

Route::group([
    'prefix' => "shopping-cart",
    'namespace' => "ShoppingCart",
    'middleware' => ["session_flash_middleware", "cart_middleware"],
], function() {
    Route::get('/', "CartController@index")->name('shopping-cart');

    Route::group([
        'middleware' => [
            "auth", "redirect_if_invalid_cart_item"
        ]
    ], function() {
        Route::get('client-info', "ClientInfoController@index")->name('shopping-cart.client-info');
        Route::post('client-info', "ClientInfoController@store");

        Route::get('billing', "BillingController@index")->name('shopping-cart.billing');
        Route::post('billing', "BillingController@store");

        Route::get('shipping', "ShippingController@index")->name('shopping-cart.shipping');
        Route::post('shipping', "ShippingController@store");

        Route::get('confirm-order', "ConfirmOrderController@index")->name('shopping-cart.confirm-order');
    });

    Route::group([
        'middleware' => "guest_middleware"
    ], function() {
        Route::get('create-user-via-cart', "CartController@createUserViaCart")->name('shopping-cart.create-user-via-cart');
        Route::post('create-user-via-cart', "CartController@storeUserViaCart");
    });
});

Route::get('login-user', function() {
    \Auth::loginUsingId(1);
});

Route::get('logout-user', function() {
    \Session::remove('cart_token');
    \Session::remove('cart_timeout');
    \Session::save();
    \Auth::logout();
});