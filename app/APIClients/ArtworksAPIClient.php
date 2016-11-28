<?php
namespace App\APIClients;

class ArtworksAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getArtwork($id)
    {
        $response = $this->get('artwork_request/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->artwork_request;
        }
        return null;
    }

    public function getArtworks($status = null)
    {
        $endpoint = 'artwork_requests';
        if (!is_null($status))
        {
            $endpoint .= '/' . $status;
        }
        $response = $this->get($endpoint);
        $result = $this->decoder->decode($response->getBody());

        $artwork_requests = [];
        if ($result->success)
        {
            $artwork_requests = $result->artwork_requests;
        }
        return $artwork_requests;
    }

    public function updateArtwork($data)
    {

        $response = $this->post('artwork_request/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

}