<?php

return [

	'is_enabled' => env('ROLLBAR_ENABLED', false),

    'environment' => env('ROLLBAR_ENVIRONMENT'),

    'access_token' => env('ROLLBAR_ACCESS_TOKEN')

];