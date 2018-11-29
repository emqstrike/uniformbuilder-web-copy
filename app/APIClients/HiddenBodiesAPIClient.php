<?php
namespace App\APIClients;

class HiddenBodiesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get('v1-0/hidden_bodies');
        $result = $this->decoder->decode($response->getBody());

        $hidden_bodies = [];
        if ($result->success)
        {
            $hidden_bodies = $result->hidden_bodies;
        }

        return $hidden_bodies;
    }

}
