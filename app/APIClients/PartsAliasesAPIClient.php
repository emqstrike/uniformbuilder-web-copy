<?php
namespace App\APIClients;

class PartsAliasesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get('parts_aliases');
        $result = $this->decoder->decode($response->getBody());

        $parts_aliases = [];
        if ($result->success)
        {
            $parts_aliases = $result->parts_aliases;
        }
        
        return $parts_aliases;
    }

}