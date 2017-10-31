<?php
namespace App\APIClients;

class ApplicationSizesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function create($data)
    {     
        $response = $this->post('application_size', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function update($data)
    {  
        $response = $this->post('application_size/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function getAll()
    {
        $response = $this->get('application_sizes');
        $result = $this->decoder->decode($response->getBody());

        $application_sizes = [];
        if ($result->success)
        {
            $application_sizes = $result->application_sizes;
        }
        
        return $application_sizes;
    }

    public function getApplicationSize($id)
    {
        $response = $this->get('application_size/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->application_size;
        }
        return null;
    }
}