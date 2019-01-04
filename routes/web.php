<?php

Route::get('remote-login/{token?}', 'AuthenticationController@remoteLogin');

Route::group([
    'prefix' => "shopping-cart"
], function() {
    Route::get('/', "ShoppingCartController@cart")->name('shopping-cart');
    Route::get('billing', "ShoppingCartController@billing")->name('shopping-cart.billing');
    Route::get('shipping', "ShoppingCartController@shipping")->name('shopping-cart.shipping');
    Route::get('confirm-order', "ShoppingCartController@confirmOrder")->name('shopping-cart.confirm-order');
});