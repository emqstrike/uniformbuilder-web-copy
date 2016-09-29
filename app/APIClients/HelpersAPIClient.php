<?php
namespace App\APIClients;

class HelpersAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getHelper($id)
    {
        $response = $this->get('helper/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->helper;
        }
        return null;
    }

    public function getHelpers()
    {
        $response = $this->get('helpers');
        $result = $this->decoder->decode($response->getBody());

        $helpers = [];
        if ($result->success)
        {
            $helpers = $result->helpers;
        }
        return $helpers;
    }

    public function createHelper($data)
    {
        $response = $this->post('helper', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateHelper($data)
    {
        $response = $this->post('helper/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }
}