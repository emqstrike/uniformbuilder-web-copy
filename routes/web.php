<?php

Route::get('remote-login/{token?}', 'AuthenticationController@remoteLogin');

Route::group([
    'prefix' => "shopping-cart",
    'namespace' => "ShoppingCart"
], function() {
    Route::get('/', "CartController@index")->name('shopping-cart');

    Route::get('client-info', "ClientInfoController@index")->name('shopping-cart.client-info');
    Route::post('client-info', "ClientInfoController@store");

    Route::get('billing', "BillingController@index")->name('shopping-cart.billing');
    Route::get('shipping', "ShippingController@index")->name('shopping-cart.shipping');
    Route::get('confirm-order', "ConfirmOrderController@index")->name('shopping-cart.confirm-order');
});