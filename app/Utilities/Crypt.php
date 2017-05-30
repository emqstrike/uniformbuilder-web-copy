<?php
namespace App\Utilities;

use Illuminate\Encryption\Encrypter;

class Crypt
{
    protected $encrypter;

    public function __construct()
    {
        $this->encrypter = new Encrypter(env('CRYPT_KEY'));
    }

    public function encrypt($string)
    {
        return $this->encrypter->encrypt($string);
    }

    public function decrypt($hashedString)
    {
        return $this->encrypter->decrypt($hashedString);
    }
}