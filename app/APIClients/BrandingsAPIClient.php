<?php
namespace App\APIClients;

class BrandingsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get('brandings');
        $result = $this->decoder->decode($response->getBody());

        $brandings = [];
        if ($result->success)
        {
            $brandings = $result->brandings;
        }        
        return $brandings;
    }

    public function create($data)
    {
       
    }

    public function updateBrandings($data)
    {
        $response = $this->post('branding/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }
    
    public function show($id)
    {
        $response = $this->get('branding/' . $id);
        $result = $this->decoder->decode($response->getBody());
        
        if ($result->success)
        {
            $brandings = $result->brandings;
            return $brandings;
        }
        return null;
    }

}