<?php
namespace App\APIClients;

class AccentsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function createAccent($data)
    {
        $response = $this->post('accent', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function updateAccent($data)
    {  
        $response = $this->post('accent/update', [

            'json' => $data
        ]);
       

        return $this->decoder->decode($response->getBody());
    }

    public function getAllAccents()
    {
        $response = $this->get('accents');
        $result = $this->decoder->decode($response->getBody());

        $accents = [];
        if ($result->success)
        {
            $accents = $result->accents;
        }
        
        return $accents;
    }

    public function getAccent($id)
    {
        $response = $this->get('accent/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {

            return $result->accent;
        }
        return null;
    }
}