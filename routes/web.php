<?php

Route::get('remote-login/{token?}', 'AuthenticationController@remoteLogin');

Route::group(['prefix' => 'richardson'], function () {
    Route::get('/index', function ()    {
        return view("richardson.index");
    });

    Route::get('/styles/{style}/types/{type}', function() {
        return view("richardson.uniform-styles");
    });
});