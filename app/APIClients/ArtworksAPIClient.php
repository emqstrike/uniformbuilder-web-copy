<?php
namespace App\APIClients;

class ArtworksAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
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

    public function countFinishedOrders()
    {
        return $this->countOrdersByStatus('finished');
    }

}