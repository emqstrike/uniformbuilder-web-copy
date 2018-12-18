<?php

Route::get('remote-login/{token?}', 'AuthenticationController@remoteLogin');

Route::group([
    'prefix' => 'authentication'
], function() {
    Route::get('authorize', 'SSOAuthenticationController@authorize');
    Route::get('callback', 'SSOAuthenticationController@authorization_callback');
});