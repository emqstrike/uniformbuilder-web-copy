<?php

Route::group([
    'prefix' => "shopping-cart",
    'namespace' => "ShoppingCart",
    'middleware' => "cart_api_middleware"
], function() {
    Route::group([
        'prefix' => "cart-item-players",
        'namespace' => "Api"
    ], function() {
        Route::get('/', "CartItemPlayerController@getPlayersPerCartItem");

        Route::post('add', "CartItemPlayerController@add")->middleware("cart_item_api_middleware");
        Route::post('{cartItemPlayer}/update', "CartItemPlayerController@update")->middleware("cart_item_api_middleware");
        Route::post('{cartItemPlayer}/delete', "CartItemPlayerController@delete")->middleware('cart_item_api_middleware');
    });
});