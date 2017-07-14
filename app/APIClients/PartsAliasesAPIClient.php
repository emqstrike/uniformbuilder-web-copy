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

    public function createPartsAliases($data)
    {
        $response = $this->post('parts_alias', [
            'json' => $data
        ]);      
        return $this->decoder->decode($response->getBody());
        
    }

    public function updatePartsAliases($data)
    {
        $response = $this->post('parts_alias/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }
    
    public function show($id)
    {
        $response = $this->get('parts_alias/' . $id);
        $result = $this->decoder->decode($response->getBody());
        
        if ($result->success)
        {
            $part = $result->part_alias;

            return $part;

        }

        return null;
    }

}