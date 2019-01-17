<?php

Route::group([
    'prefix' => "shopping-cart",
    'namespace' => "ShoppingCart",
    'middleware' => "cart_api_middleware"
], function() {
    Route::post('cart-item/{cart_item_id}/add-player', "Api\CartItemPlayerController@addPlayer")->middleware("cart_item_api_middleware");
    Route::post('cart-item/{cart_item_id}/delete-player/{player_id}', "Api\CartItemPlayerController@deletePlayer");

    Route::get('get-players-per-cart-item', "Api\CartItemPlayerController@getPlayersPerCartItem");
});