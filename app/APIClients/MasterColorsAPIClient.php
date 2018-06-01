<?php
namespace App\APIClients;

class MasterColorsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllColors()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/master_colors');
        $result = $this->decoder->decode($response->getBody());
        $colors = [];
        if ($result->success)
        {
            $colors = $result->colors;
        }
        return $colors;
    }
}
