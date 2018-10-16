<?php

return [

    'asset_version' => env('ASSET_VERSION', 0.0001),

    'api_host' => env('API_HOST'),

    'enabled_https' => env('ENABLE_HTTPS', true),

    'vendor' => [

        'code' => env('VENDOR_CODE', 'prolook'),

        'name' => env('VENDOR_NAME', 'ProLook'),

    ]

];