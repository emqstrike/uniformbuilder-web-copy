<?php
namespace App\Utilities;

use Storage;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Intervention\Image\ImageManagerStatic as Image;

class MaterialUploader
{
    /**
     * Upload texture file to S3
     * @param UploadedFile $uploadedFile
     * @param String $materialName
     * @param String $type 'material' or 'bump' | 'thumbnail'
     * @return String URL of the uploade file or null
     */
    public static function upload(
        UploadedFile $uploadedFile,
        $materialName,
        $type = 'material'
    )
    {
        if ($type == 'thumbnail')
        {
            return self::createThumbnail($uploadedFile, $materialName);
        }
        else
        {
            $uploadedFilePath = self::moveToTemporaryFolder($uploadedFile, $materialName);
            return self::uploadToS3($uploadedFilePath, $materialName, $type);
        }

        return null;
    }

    public static function makeSlug($name)
    {
        return str_replace(' ', '-', strtolower($name));
    }

    /**
     * @param UploadedFile $uploadedFile
     * @param String $materialName
     * @param String File path of the uploaded file
     */
    public static function moveToTemporaryFolder(UploadedFile $uploadedFile, $materialName)
    {
        $filename = $uploadedFile->getClientOriginalName();
        if (is_null($materialName))
        {
            throw new Exception('Material name cannot be null');
        }
        $temporaryFolder = '/tmp/' . self::makeSlug($materialName) . '/';
        $filePath = $temporaryFolder . $filename;
        if (!file_exists($filePath))
        {
            $uploadedFile->move($temporaryFolder, $filename);
        }
        return $filePath;
    }

    /**
     * @param String $filePath Source File
     * @param String $materialName
     * @param String $type 'material' or 'bump' | 'thumbnail'
     * @return String URL of uploaded file
     */
    public static function uploadToS3($filePath, $materialName, $type)
    {
        $filename = 'material.jpg';
        if ($type == 'material')
        {
            $filename = 'material.jpg';
        }
        elseif ($type == 'bump')
        {
            $filename = 'bump.jpg';
        }
        elseif ($type == 'thumbnail')
        {
            $filename = 'thumbnail.jpg';
        }
        elseif ($type == 'shadow')
        {
            $filename = 'shadow.png';
        }
        elseif ($type == 'highlight')
        {
            $filename = 'highlight.png';
        }
        elseif ($type == 'thumbnail')
        {
            $filename = 'thumbnail.png';
        }

        // Prepare PATH
        $materialFolder = 'materials/' . env('APP_ENV') . '/';
        $folder = $materialFolder . self::makeSlug($materialName);
        $s3TargetPath = "{$folder}/{$filename}";

        // Upload to S3
        $s3 = Storage::disk('s3');
        if ($s3->put($s3TargetPath, file_get_contents($filePath)))
        {
            // Build the Path
            $protocol = $s3->getDriver()->getAdapter()->getClient()->getEndpoint()->getScheme();
            $host = $s3->getDriver()->getAdapter()->getClient()->getEndpoint()->getHost();
            $bucket = $s3->getDriver()->getAdapter()->getBucket();

            return "{$protocol}://{$host}/{$bucket}/{$s3TargetPath}";
        }
        return null;
    }

    public static function createThumbnail(UploadedFile $uploadedFile, $materialName)
    {
        Image::configure([
            'driver' => 'imagick'
        ]);
        $uploadedFilePath = self::moveToTemporaryFolder($uploadedFile, $materialName);

        try
        {
            $image = Image::make($uploadedFilePath)->resize(100, 100);
        }
        catch (Exception $e)
        {
            return false;
        }

        $filename = "thumbnail.png";

        // Local Path (Temporary)
        $slugFolder = self::makeSlug($materialName);
        $destinationFolder = "/tmp/{$slugFolder}" ;
        $targetDestinationPath = "{$destinationFolder}/{$filename}";

        // Upload thumbnail to S3
        if ($image->save($targetDestinationPath))
        {
            $thumbnailPath = self::uploadToS3($targetDestinationPath, $materialName, 'thumbnail');
            return $thumbnailPath;
        }
    }
}