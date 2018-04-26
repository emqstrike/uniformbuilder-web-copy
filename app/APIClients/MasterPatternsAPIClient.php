<?php
namespace App\APIClients;

class MasterPatternsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllPatterns()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/master_patterns');
        $result = $this->decoder->decode($response->getBody());

        $patterns = [];
        if ($result->success)
        {
            $patterns = $result->patterns;
        }
        return $patterns;
    }
}
