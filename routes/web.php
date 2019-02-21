<?php

Route::get('remote-login/{token?}', 'AuthenticationController@remoteLogin');

Route::group(['prefix' => 'richardson'], function () {
    Route::get('/index', function ()    {
        return view("richardson.index");
    });

    Route::get("/customize/{uniform_id}", function($uniform_id) {
        // return $uniform_id;
        return view("richardson.customize", compact('uniform_id'));
    });
});