<?php

Route::group([
    'prefix' => "shopping-cart",
    'namespace' => "ShoppingCart",
    'middleware' => "cart_api_middleware"
], function() {
    Route::post('cart-item-players/add', "Api\CartItemPlayerController@add")->middleware("cart_item_api_middleware");
    Route::post('cart-item-players/{cartItemPlayer}/update', "Api\CartItemPlayerController@update")->middleware("cart_item_api_middleware");
    Route::post('cart-item-players/{cartItemPlayer}/delete', "Api\CartItemPlayerController@delete")->middleware('cart_item_api_middleware');

    Route::get('cart-item-players', "Api\CartItemPlayerController@getPlayersPerCartItem");
});