<?php
namespace App\APIClients;

class PlaceholdersAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getPlaceholders()
    {
        $response = $this->get('placeholders');
        $result = $this->decoder->decode($response->getBody());

        $placeholders = [];
        if ($result->success)
        {
            $placeholders = $result->placeholders;
        }
        return $placeholders;
    }

    public function createPlaceholder($data)
    {
        $response = $this->post('placeholder', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }
}