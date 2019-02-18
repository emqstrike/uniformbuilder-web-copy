<?php

Route::get('remote-login/{token?}', 'AuthenticationController@remoteLogin');

Route::group(['prefix' => 'richardson'], function () {
    Route::get('/index', function ()    {
        return view("richardson.index");
    });
});