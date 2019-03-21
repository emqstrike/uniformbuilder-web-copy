<?php

return [

    'asset_version' => env('ASSET_VERSION', 0.0001),

    'api_host' => env('API_HOST'),

    'access_saved_designs' => env('ACCESS_SAVED_DESIGNS'),

    'enabled_https' => env('ENABLE_HTTPS', true),

    'force_ssl' => env('FORCE_SSL', true),

    'vendor' => [

        'code' => env('VENDOR_CODE', 'prolook'),

        'name' => env('VENDOR_NAME', 'ProLook'),

    ]

];
