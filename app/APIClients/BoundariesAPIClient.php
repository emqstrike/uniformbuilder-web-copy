<?php
namespace App\APIClients;

class BoundariesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getBoundaries()
    {
        $response = $this->get('boundaries');
        $result = $this->decoder->decode($response->getBody());

        $boundaries = [];
        if ($result->success)
        {
            $boundaries = $result->boundaries;
        }
        return $boundaries;
    }
}