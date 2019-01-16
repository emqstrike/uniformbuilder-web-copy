<?php

Route::group([
    'prefix' => "shopping-cart",
    'namespace' => "ShoppingCart",
    'middleware' => "cart_api_middleware"
], function() {
    Route::post('add-player-to-cart-item', "CartController@addPlayerToCartItem")->middleware('cart_item_api_middleware');
});