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
}