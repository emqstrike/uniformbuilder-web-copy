<?php

Route::get('remote-login/{token?}', 'AuthenticationController@remoteLogin');