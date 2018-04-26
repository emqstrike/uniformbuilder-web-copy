<?php
namespace App\APIClients;

class MasterFabricsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllFabrics()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/master_fabrics');
        $result = $this->decoder->decode($response->getBody());

        $fabrics = [];
        if ($result->success)
        {
            $fabrics = $result->fabrics;
        }
        return $fabrics;
    }
}