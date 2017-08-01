<?php
namespace App\APIClients;

class CutsLinksAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get('cut_links');
        $result = $this->decoder->decode($response->getBody());

        $cuts_links = [];
        if ($result->success)
        {
            $cuts_links = $result->cuts_links;
        }        
        return $cuts_links;
    }

    public function createCutsLinks($data)
    {
        $response = $this->post('cuts_links', [
            'json' => $data
        ]);      
        return $this->decoder->decode($response->getBody());
        
    }

    public function updateCutsLinks($data)
    {
        $response = $this->post('cuts_links/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }
    
    public function show($id)
    {
        $response = $this->get('cuts_links/' . $id);
        $result = $this->decoder->decode($response->getBody());
        
        if ($result->success)
        {
            $cut_links = $result->cuts_links;
            return $cut_links;
        }
        return null;
    }

}