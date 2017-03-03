<?php

namespace App\Utilities;

use Crypt;

class StringUtility
{
    /**
     * Encrypt the saved design ID
     * [VENDOR_CODE]-[SAVED_DESIGN_ID]
     * @param Integer $id Showcase ID format
     * @return String
     */
    public static function encryptShowcaseId($id)
    {
        $salt = config('customizer.vendor.code');
        $showcaseId = "{$salt}-{$id}";
        $showcaseIdHash = Crypt::encrypt($showcaseId);
        return $showcaseIdHash;
    }

    /**
     * Decrypt the showcase ID
     * @param String $id
     * @return Integer
     */
    public static function decryptShowcaseId($id)
    {
        $salt = config('customizer.vendor.code');
        $decrypted = Crypt::decrypt($id);
        $dash_pos = strpos($decrypted, '-');
        $id = substr($decrypted, ($dash_pos + 1));
        if (!empty($id))
        {
            return (int) $id;
        }
        return null;
    }
}