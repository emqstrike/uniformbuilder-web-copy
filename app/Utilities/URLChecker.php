<?php
namespace App\Utilities;

class URLChecker
{
    public static function is404($url)
    {
        $handle = curl_init($url);
        curl_setopt($handle,  CURLOPT_RETURNTRANSFER, TRUE);

        $response = curl_exec($handle);

        $httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);

        if ($httpCode == 404) {
            return true;
        }

        return false;
    }
}