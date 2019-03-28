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

    'test_orders' => filter_var(env('TEST_ORDERS', true), FILTER_VALIDATE_BOOLEAN),

    'currency_code_used' => env("CURRENCY_CODE_USED"),

    'pricing_ages' => [
        "adult",
        "youth"
    ]
];
