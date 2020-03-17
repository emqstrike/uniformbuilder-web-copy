<?php

Route::get('remote-login/{token?}', 'AuthenticationController@remoteLogin');

Route::get('mascots', function() {
    return view('mascot');
});