<?php

namespace App\APIClients;

use App\APIClients\APIClient;


class CustomArtworkRequestAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $response = $this->get('custom_artwork_requests');
        $response = $this->decoder->decode($response->getBody());

        if ($response->success == true) {
            return $response->custom_artwork_requests;
        }

        return null;
    }

    public function getProcessing()
    {
        $response = $this->get('custom_artwork_requests/processing');
        $response = $this->decoder->decode($response->getBody());

        if ($response->success == true) {
            return $response->custom_artwork_requests;
        }

        return null;
    }

    public function getByID($id)
    {
        $response = $this->get('custom_artwork_requests/' . $id);
        $response = $this->decoder->decode($response->getBody());

        if ($response->success == true) {
            return $response->custom_artwork_request;
        }

        return null;
    }

    public function update($customArtworkID, $mascotID)
    {
        $data = array(
            'custom_artwork_id' => $customArtworkID,
            'mascot_id'         => $mascotID
        );

        $response = $this->post('custom_artwork_requests/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }
}
