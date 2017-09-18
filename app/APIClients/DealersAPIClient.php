<?php
namespace App\APIClients;

class DealersAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get('dealers');
        $result = $this->decoder->decode($response->getBody());

        $dealers = [];
        if ($result->success)
        {
            $dealers = $result->dealers;
        }        
        return $dealers;
    }

    public function createDealer($data)
    {
        $response = $this->post('dealers', [
            'json' => $data
        ]);      
        return $this->decoder->decode($response->getBody());
        
    }

    public function updateDealer($data)
    {
        $response = $this->post('dealer/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }
    
    public function show($id)
    {
        $response = $this->get('dealer/' . $id);
        $result = $this->decoder->decode($response->getBody());
        
        if ($result->success)
        {
            $dealers = $result->dealers;
            return $dealers;
        }
        return null;
    }

}