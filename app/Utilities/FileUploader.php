<?php
namespace App\Utilities;

use Storage;
use App\Utilities\Random;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Intervention\Image\ImageManagerStatic as Image;

class FileUploader
{
    /**
     * Upload texture file to S3
     * @param UploadedFile $uploadedFile
     * @param String $objectName
     * @param String $type 'material' or 'bump' | 'thumbnail'
     * @param String $s3folder
     * @param String $filename
     * @return String URL of the uploade file or null
     */
    public static function upload(
        UploadedFile $uploadedFile,
        $objectName,
        $type = 'material',
        $s3folder = 'materials',
        $filename = 'material.jpg'
    )
    {
        if ($type == 'thumbnail')
        {
            return self::createThumbnail($uploadedFile, $objectName, $type, $s3folder);
        }
        else
        {
            $uploadedFilePath = self::moveToTemporaryFolder($uploadedFile, $objectName);
            return self::uploadToS3($uploadedFilePath, $objectName, $type, $s3folder, $filename);
        }

        return null;
    }

    public static function makeSlug($name)
    {
        return str_replace(' ', '-', strtolower($name));
    }

    /**
     * @param UploadedFile $uploadedFile
     * @param String $objectName
     * @param String File path of the uploaded file
     */
    public static function moveToTemporaryFolder(uploadedfile $uploadedFile, $objectName)
    {
        $filename = $uploadedFile->getClientOriginalName();
        if (is_null($objectName))
        {
            throw new Exception('Material name cannot be null');
        }
        $temporaryFolder = '/tmp/' . Random::randomize(6) . '/' . self::makeSlug($objectName) . '/';
        $filePath = $temporaryFolder . $filename;
        if (!file_exists($filePath))
        {
            $uploadedFile->move($temporaryFolder, $filename);
        }
        return $filePath;
    }

    /**
     * @param String $filePath Source File
     * @param String $objectName
     * @param String $type 'material' or 'bump' | 'thumbnail'
     * @param String $s3folder 'materials'
     * @return String URL of uploaded file
     */
    public static function uploadToS3(
        $filePath,
        $objectName,
        $type = 'material',
        $s3folder = 'materials',
        $filename = 'material.jpg')
    {
        $folder = $s3folder . '/' . env('APP_ENV') . '/' . self::makeSlug($objectName);
        if ($type == 'material')
        {
            $filename = 'material.jpg';
        }
        elseif ($type == 'material_option')
        {
            // Just Retain the filename
            $folder = $s3folder . '/' . env('APP_ENV');
        }
        elseif ($type == 'tailsweep')
        {
            // Just Retain the filename
            $folder = 'tailsweep/' . env('APP_ENV');
        }
        elseif (($type == 'material_perspective_view') || ($type == 'material_perspective_shape'))
        {
            // Just Retain the filename
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
        elseif ($type == 'base_model')
        {
            $filename = 'base_model.json';
        }
        elseif ($type == 'pattern_layer')
        {
            // Just Retain the filename
        }
        elseif ($type == 'pattern_thumbnail')
        {
            $filename = 'thumbnail.png';
        }
        elseif ($type == 'font')
        {
            $filename = 'font.ttf';
        }
        elseif ($type == 'fabric')
        {
            $filename = 'fabric.png';
        }
        elseif ($type == 'gradient')
        {
            $filename = 'gradient.png';
        }
        else
        {
            error_log('Unsupported File Type');
            return null;
        }

        // Prepare PATH        
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

    /**
     * Upload texture file to S3
     * @param UploadedFile $uploadedFile
     * @param String $objectName
     * @param String $type 'material' or 'bump' | 'thumbnail'
     * @return String URL of the uploade file or null
     */
    public static function createThumbnail(
        UploadedFile $uploadedFile,
        $objectName,
        $type = 'material',
        $s3folder = 'materials'
    )
    {
        Image::configure([
            'driver' => 'imagick'
        ]);
        $uploadedFilePath = self::moveToTemporaryFolder($uploadedFile, $objectName);

        try
        {
            $image = Image::make($uploadedFilePath)->resize(388, 420);
        }
        catch (Exception $e)
        {
            return false;
        }

        $filename = "thumbnail.png";

        // Local Path (Temporary)
        $slugFolder = self::makeSlug($objectName);
        $destinationFolder = "/tmp/{$slugFolder}";
        $targetDestinationPath = "{$destinationFolder}/{$filename}";

        // check if $folder is a directory
        if( ! \File::isDirectory($destinationFolder) ) {

            \File::makeDirectory($destinationFolder, 493, true);

        }

        // Upload thumbnail to S3
        if ($image->save($targetDestinationPath))
        {
            $thumbnailPath = self::uploadToS3($targetDestinationPath, $objectName, 'thumbnail', $s3folder);
            return $thumbnailPath;
        }
    }
}