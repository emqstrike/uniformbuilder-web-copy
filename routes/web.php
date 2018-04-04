<?php

Route::get('remote-login/{token?}', 'AuthenticationController@remoteLogin');

Route::get('home', 'HomeController@index');