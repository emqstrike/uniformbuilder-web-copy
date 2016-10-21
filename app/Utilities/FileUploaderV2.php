<?php
namespace App\Utilities;

use Storage;
use App\Utilities\Random;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Intervention\Image\ImageManagerStatic as Image;

class FileUploaderV2
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
        $uploadedFilePath = self::moveToTemporaryFolder($uploadedFile, $objectName);
        // return self::uploadToS3($uploadedFilePath, $objectName, $type, $s3folder, $filename);
        return self::uploadToS3($uploadedFilePath, $objectName, $type, $s3folder, $uploadedFile);
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
     * @param String $s3folder 'uploaded_files'
     * @return String URL of uploaded file
     */
    public static function uploadToS3(
        $filePath,
        $objectName,
        $type = 'material',
        $s3folder = 'uploaded_files',
        uploadedfile $uploadedFile
    )
    {
        // $folder = $s3folder . '/' . env('APP_ENV');
        $folder = $s3folder . '/' . env('APP_ENV') . '/' . self::makeSlug($objectName);

        // Prepare PATH
        $filename = $uploadedFile->getClientOriginalName();
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
}