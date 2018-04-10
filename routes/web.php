<?php

Route::get('remote-login/{token?}', 'AuthenticationController@remoteLogin');

// routes for react components
Route::get('saved-designs', 'AppController@mySavedDesigns');