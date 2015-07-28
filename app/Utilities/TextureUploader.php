<?php
namespace App\Utilities;

use Storage;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class TextureUploader
{
    /**
     * Upload texture file to S3
     * @param UploadedFile $uploadedFile
     * @param String $bucket
     * @param String $textureName
     */
    public static function upload(UploadedFile $uploadedFile, $bucket, $textureName)
    {
        $filename = $uploadedFile->getClientOriginalName();

        // Save to /tmp/ folder
        $destinationFolder = '/tmp';
        $uploadedFile->move($destinationFolder, $filename);
        $uploadedFilePath = "{$destinationFolder}/{$filename}";

        // Upload to S3
        $textureFolder = 'textures/';
        $textureSlugFolder = $textureFolder . self::makeSlug($textureName);
        $targetUploadFilePath = "{$textureSlugFolder}/{$filename}";
        if (Storage::disk('s3')->put(
            $targetUploadFilePath,
            file_get_contents($uploadedFilePath))
        )
        {
            // Build the Path
            $s3 = Storage::disk('s3');
            $protocol = $s3->getDriver()->getAdapter()->getClient()->getEndpoint()->getScheme();
            $host = $s3->getDriver()->getAdapter()->getClient()->getEndpoint()->getHost();
            $bucket = $s3->getDriver()->getAdapter()->getBucket();
error_log("{$protocol}://{$host}/{$bucket}/{$targetUploadFilePath}");
            return "{$protocol}://{$host}/{$bucket}/{$targetUploadFilePath}";
        }
        error_log('S3 File Upload Failed');
        return null;

    }

    public static function makeSlug($name)
    {
        return str_replace(' ', '-', strtolower($name));
    }
}