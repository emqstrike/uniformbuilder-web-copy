<?php
namespace App\Utilities;

class FileUtility
{

    /**
     * Extracts the filename only
     * @param String Local Filesystem Path
     * @return String Filename
     */
    public static function extractFilename($filePath)
    {
        $filename = substr($filePath, (strrpos($filePath, '/') + 1), (strlen($filePath) - strrpos($filePath, '/')));
        return $filename;
    }
}