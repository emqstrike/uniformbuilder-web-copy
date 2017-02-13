<?php
namespace App\APIClients;

class SplashImageAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function createSplashImage($data)
    {
        $response = $this->post('splash_image', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function updateSplashImage($data)
    {
        $response = $this->post('splash_image/update', [
            'json' => $data
        ]);
       
        return $this->decoder->decode($response->getBody());
    }

    public function getAllSplashImages()
    {
        $response = $this->get('splash_images');
        $result = $this->decoder->decode($response->getBody());

        $splash_images = [];
        if ($result->success)
        {
            $splash_images = $result->splash_images;
        }
        
        return $splash_images;
    }

    public function getSplashImage($id)
    {
        $response = $this->get('splash_image/' . $id);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->splash_image;
        }
        return null;
    }
}