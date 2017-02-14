<?php
namespace Customizer\Utilities;

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

    /**
     * Exports a base64-encoded email to a PNG file
     * @param String a base64-encoded string
     * @return Mixed False when decoding failed; File path whenever decoding worked
     */
    public static function saveBase64Image($data)
    {
        // This lines extracts the base64 encoded data from the string
        list($type, $data) = explode(';', $data);
        list($tmp, $data) = explode(',', $data);

        $filePath = '/tmp/' . Random::randomize(16) . '.png';
        if (file_put_contents($filePath, base64_decode($data)) === false)
        {
            return false;
        }
        return $filePath;
    }
}