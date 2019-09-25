<?php
namespace App\APIClients;

class PipingsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function create($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/pipings/create', [
            'json' => $data
        ]);
       return $this->decoder->decode($response->getBody());
    }

    public function update($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/pipings/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function getAllPipings()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/pipings');
        $result = $this->decoder->decode($response->getBody());

        $pipings = [];
        if ($result->success)
        {
            $pipings = $result->pipings;
        }

        return $pipings;
    }

    public function getPipings($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/pipings/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->pipings;
        }
        return null;
    }
}
