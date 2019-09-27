<?php
namespace App\APIClients;

class ApplicationMapperClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getApplicationMappers()
    {
        $response = $this->get('application_mappers');
        $result = $this->decoder->decode($response->getBody());

        $application_mappers = [];

        if ($result->success) {
            $application_mappers = $result->application_mappers;
        }
        
        return $application_mappers;
    }

    public function getApplicationMapper($id)
    {
        $response = $this->get('application_mapper/' . $id);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success) {
            return $result->application_mapper;
        }
        
        return null;
    }

    public function store($data)
    {
        $response = $this->post('application_mapper', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function update($data)
    {
        $response = $this->post('application_mapper/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }
}