<?php

return [

    'asset_version' => env('ASSET_VERSION', 0.0001),

    'api_http_protocol' => env('API_HTTP_PROTOCOL', 'https'),

    'api_host' => env('API_HOST'),

    'enabled_https' => env('ENABLE_HTTPS', true),

    'force_ssl' => env('FORCE_SSL', true),

    'vendor' => [

        'code' => env('VENDOR_CODE', 'prolook'),

        'name' => env('VENDOR_NAME', 'ProLook'),

    ],

    'sizes' => [
        24 => "24",
        26 => "26 (YS)",
        28 => "28 (YM)",
        30 => "30 (YS)",
        32 => "32 (YL)",
        34 => "34 (YXL)",
        36 => "36 (S)",
        38 => "38 (M)",
        40 => "40",
        42 => "42 (L)",
        44 => "44",
        46 => "46 (XL)",
        48 => "48",
        50 => "50 (2XL)",
        52 => "52",
        54 => "54 (3XL)"
    ],

    'test_orders' => filter_var(env('TEST_ORDERS', true), FILTER_VALIDATE_BOOLEAN)
];
