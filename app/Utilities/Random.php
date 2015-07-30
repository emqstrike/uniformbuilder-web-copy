<?php
namespace App\Utilities;

class Random {
    public static function generateToken($length = 32)
    {
        return self::randomize($length);
    }

    public static function randomize($length = 32)
    {
        return bin2hex(openssl_random_pseudo_bytes($length));
    }
}