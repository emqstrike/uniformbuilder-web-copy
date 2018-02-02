<?php
namespace App\Utilities;

use Log;
use Intervention\Image\ImageManagerStatic as Image;

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

        if(strncasecmp(PHP_OS, 'WIN', 3) == 0) {
            $filePath = sys_get_temp_dir() . '/' . Random::randomize(16) . '.png';
        }
        else {
            $filePath = '/tmp/' . Random::randomize(16) . '.png';
        }

        if (file_put_contents($filePath, base64_decode($data)) === false)
        {
            return false;
        }
        return $filePath;
    }

    public static function saveBase64ImageResized($data, $width, $height)
    {
        // This lines extracts the base64 encoded data from the string
        list($type, $data) = explode(';', $data);
        list($tmp, $data) = explode(',', $data);

        if(strncasecmp(PHP_OS, 'WIN', 3) == 0) {
            $filePath = sys_get_temp_dir() . '/' . Random::randomize(16) . '.png';
        }
        else {
            $filePath = '/tmp/' . Random::randomize(16) . '.png';
        }

        try
        {
            $image = Image::make(base64_decode($data))->resize($width, $height);
        }
        catch (Exception $e)
        {
            return false;
        }

        if (file_put_contents($filePath, $image) === false)
        {
            return false;
        }

        return $filePath;
    }

    public static function resizeImage($image, $filename, $size = 40)
    {
        // General variables
        $PIXEL_PER_BOX = 8;

        // uniform variables
        $UNIFORM_SIZE = $size / 100;
        $TRIM_TOP = 0 * $PIXEL_PER_BOX;
        $TRIM_BOTTOM = 50 * $PIXEL_PER_BOX;

        $uniform = Image::make($image);
        $uniform_w = $uniform->getWidth();
        $uniform_h = $uniform->getHeight();

        // $uniform_h = ($uniform_h - ($TRIM_TOP + $TRIM_BOTTOM));

        $uniform->crop($uniform_w, $uniform_h, 0, 0);
        $uniform->resize($uniform_w * $UNIFORM_SIZE, $uniform_h * $UNIFORM_SIZE);

        // finally we save the image as a new file
        $save_to_file_path = sys_get_temp_dir() . '/' . $filename;
        Log::info('Saved to ' . $save_to_file_path);
        $uniform->save($save_to_file_path);
        return $save_to_file_path;
    }

    public static function saveSvgToS3($svg, $perspective = 'front')
    {
        Log::info(strtoupper($perspective) . ' perspective');

        // Convert SVG (front) to PNG
        $image = static::saveBase64Image($svg);

        // Upload to TeamStore bucket
        $bucket = 'team-stores';
        $url = FileUploader::uploadImageToAWS($image, 'products');

        Log::info('Uploaded to s3 ' . $url);

        return $url;
    }
}