<?php
namespace App\APIClients;

class BrandingsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/brandings');
        $result = $this->decoder->decode($response->getBody());

        $brandings = [];
        if ($result->success)
        {
            $brandings = $result->brandings;
        }
        return $brandings;
    }

    public function createBrand($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/branding', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function updateBrand($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/branding/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function show($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/branding/' . $id);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            $brandings = $result->brandings;
            return $brandings;
        }
        return null;
    }

}
