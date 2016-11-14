<?php
namespace App\APIClients;

class ArtworksAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getOrders($status = null)
    {
        $endpoint = 'orders';
        if (!is_null($status))
        {
            $endpoint .= '/' . $status;
        }
        $response = $this->get($endpoint);
        $result = $this->decoder->decode($response->getBody());

        $orders = [];
        if ($result->success)
        {
            $orders = $result->orders;
        }
        return $orders;
    }

    public function countFinishedOrders()
    {
        return $this->countOrdersByStatus('finished');
    }

}