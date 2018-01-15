<?php
namespace App\APIClients;

class SingleViewApplicationsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function create($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/single_view_applications', [
            'json' => $data
        ]);
       return $this->decoder->decode($response->getBody());
    }

    public function update($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/single_view_applications/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function getAll()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/single_view_applications');
        $result = $this->decoder->decode($response->getBody());

        $single_view_applications = [];
        if ($result->success)
        {
            $single_view_applications = $result->single_view_applications;
        }

        return $single_view_applications;
    }

    public function getSingleViewApplications($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/single_view_applications/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->single_view_applications;
        }
        return null;
    }
}
