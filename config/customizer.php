<?php

return [

    /**
    |--------------------------------------------------------------------------
    | Asset Version Number
    |--------------------------------------------------------------------------
    |
    | Asset version number is used on loading the assets
    |
     */
    'asset_version' => env('ASSET_VERSION', 1),

    /**
    |--------------------------------------------------------------------------
    | Specific Vendor Settings
    |--------------------------------------------------------------------------
    |
    | `title` - The customizer title
    | `logo_url` - Vendor Logo URL
    | `vendor_code` - The code distinguishes this customizer from other instances
    |
     */
    'vendor' => [
        'title' => env('APP_TITLE', 'ProLook Customizer'),
        'logo_url' => env('LOGO_URL', 'https://s3-us-west-2.amazonaws.com/prolook/images/pl-logo.png'),
        'code' => env('VENDOR_CODE', 'prolook')
    ]

];
