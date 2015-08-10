<?php

namespace App\Http\Controllers;


use \Session;
use \Redirect;
use GuzzleHttp\Client;
use App\Http\Requests;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;
use App\Utilities\S3Uploader;

class UploadImageController extends Controller
{
    protected $client;
    protected $apiHost;

    public function __construct($accessToken = null)
    {
        $settings = [
            'base_uri' => 'http://' . getenv('API_HOST') . '/api/',
        ];
        if (!is_null($accessToken))
        {
            $settings['headers'] = [
                'accessToken' => $accessToken
            ];
        }
        $this->client = new Client($settings);
    }

    /**
     * Upload file to S3 and return path
     * @param Request $request
     * @return String URL from S3
     */
    public function upload(Request $request)
    {
        $uploaded = $request->file();
        $keys = array_keys($uploaded);

        $file = $uploaded[$keys[0]];
        $filename = $file->getClientOriginalName();
        $ext = $file->getClientOriginalExtension();
        $mime = $file->getClientMimeType();
        error_log(print_r([$filename, $ext, $mime], true));

        $uploadResult = S3Uploader::upload($file);

        $response = $this->client->post('image', [
            'json' => [
                'image_path' => $uploadResult['image_path'],
                'thumbnail_path' => $uploadResult['thumbnail_path']
            ]
        ]);

        $decoder = new JsonDecoder();
        $result = $decoder->decode($response->getBody());

        if ($result->success)
        {
            echo '<pre>';
            echo 'Upload Result:';
            print_r($uploadResult);
            echo 'Save to DB Result:';
            print_r($result);
            echo '</pre>';
            echo '<a href="/uploadImageForm">Back to Upload Images Form</a>';
        }
        else
        {
            return Redirect::to('uploadImageForm')
                            ->with('message', 'There was a problem uploading your image');
        }
    }

    public function uploadImageForm()
    {
        $response = $this->client->get('images');
        $decoder = new JsonDecoder();
        $result = $decoder->decode($response->getBody());
        $images = [];
        if ($result->success)
        {
            $images = $result->images;
        }

        return view('upload-image-form', [
           'images' => $images,
           'api_upload_image_endpoint' => 'http://' . env('API_HOST') . '/api/image/upload'
        ]);
    }
}