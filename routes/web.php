<?php

Route::get('remote-login/{token?}', 'AuthenticationController@remoteLogin');

// routes for react components
Route::get('app', 'AppController@showHome');
Route::get('saved-designs', 'AppController@mySavedDesigns');
Route::get('test', 'AppController@nicoTest');