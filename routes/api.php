<?php

Route::group([
    'prefix' => "shopping-cart",
    'namespace' => "ShoppingCart\Api",
    'middleware' => "cart_api_middleware"
], function() {
    Route::group([
        'prefix' => "cart-items"
    ], function() {
        Route::get('/', "CartItemController@getCartItems");
        Route::post('add-to-cart', "CartItemController@addToCart");
        Route::post('{cart_item_id}/update', "CartItemController@updateItem");
    });

    Route::group([
        'prefix' => "cart-item-players"
    ], function() {
        Route::get('/', "CartItemPlayerController@getPlayersPerCartItem");

        Route::post('add', "CartItemPlayerController@add")->middleware("cart_item_api_middleware");
        Route::post('{cartItemPlayer}/update', "CartItemPlayerController@update")->middleware("cart_item_api_middleware");
        Route::post('{cartItemPlayer}/delete', "CartItemPlayerController@delete")->middleware('cart_item_api_middleware');
    });
});