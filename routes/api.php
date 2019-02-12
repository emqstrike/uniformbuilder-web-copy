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
        Route::put('{cart_item_id}/update', "CartItemController@updateItem");
        Route::put('{cart_item_id}/update-thumbnail', "CartItemController@updateThumbnail");
        Route::delete('{cart_item_id}/delete-to-cart', "CartItemController@deleteToCart");
    });

    Route::group([
        'prefix' => "cart-item-players"
    ], function() {
        Route::get('/', "CartItemPlayerController@getPlayersPerCartItem");

        Route::post('add', "CartItemPlayerController@add")->middleware("cart_item_api_middleware");
        Route::put('{cartItemPlayer}/update', "CartItemPlayerController@update")->middleware("cart_item_api_middleware");
        Route::delete('{cartItemPlayer}/delete', "CartItemPlayerController@delete")->middleware('cart_item_api_middleware');
    });

    Route::group([
        'prefix' => "client-info"
    ], function() {
        Route::get('/', "ClientInfoController@getInfo");
    });
});