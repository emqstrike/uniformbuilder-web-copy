<?php
namespace App\Utilities;

use Storage;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Intervention\Image\ImageManagerStatic as Image;
use App\Utilities\Random;
use App\Utilities\FileUtility;

class S3Uploader
{
    public static function upload(UploadedFile $file)
    {
        $result = [];
        $actualLocalPath = self::moveToTemporaryFolder($file);
        $result['image_path'] = self::uploadToS3($actualLocalPath);
        if (file_exists($actualLocalPath))
        {
            $thumbnailLocalPath = self::createThumbnail($actualLocalPath);
            $result['thumbnail_path'] = self::uploadToS3($thumbnailLocalPath);
        }
        return $result;
    }

    public static function moveToTemporaryFolder(UploadedFile $file)
    {
        $random = Random::randomize(8);
        $ext = $file->getClientOriginalExtension();
        $filename = "{$random}.{$ext}";
        $temporaryFolder = '/tmp/';
        $filePath = $temporaryFolder . $filename;
        if (!file_exists($filePath))
        {
            $file->move($temporaryFolder, $filename);
        }
        return $filePath;
    }

    /**
     * @param String $filePath Source File
     * @param String $materialName
     * @param String $type 'material' or 'bump' | 'thumbnail'
     * @return String URL of uploaded file
     */
    public static function uploadToS3($filePath)
    {
        $filename = FileUtility::extractFilename($filePath);

        // Upload to S3
        $folder = 'uploads/' . env('APP_ENV');
        $targetPath = "{$folder}/{$filename}";
    error_log('S3 Target Path: ' . $targetPath);
        $s3 = Storage::disk('s3');
        if ($s3->put($targetPath, file_get_contents($filePath)))
        {
            // Build the Path
            $protocol = $s3->getDriver()->getAdapter()->getClient()->getEndpoint()->getScheme();
            $host = $s3->getDriver()->getAdapter()->getClient()->getEndpoint()->getHost();
            $bucket = $s3->getDriver()->getAdapter()->getBucket();
            error_log('S3 PATH: ' . "{$protocol}://{$host}/{$bucket}/{$targetPath}");
            return "{$protocol}://{$host}/{$bucket}/{$targetPath}";
        }
        return null;
    }

    /**
     * Generate a thumbnail
     * @param String $filepath
     * @param Integeer $width
     * @param Integer $height
     * @return String URL S3 Location of the Thumbnail
     */
    public static function createThumbnail($filePath, $width = 256, $height = 256)
    {
        // Add suffix to the filename
        $filename = FileUtility::extractFilename($filePath);
        $filename = str_replace('.', '-thumbnail.', $filename);

        Image::configure([
            'driver' => 'imagick'
        ]);

        // Resize Image to 256 x 256
        try
        {
            $image = Image::make($filePath)->resize(256, 256);
        }
        catch (Exception $e)
        {
            return false;
        }

        // Local Path (Temporary)
        $targetPath = "/tmp/thumbnail-{$filename}";

        // Upload thumbnail to S3
        if ($image->save($targetPath))
        {
            return $targetPath;
        }
        return false;
    }
}