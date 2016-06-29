<?php
namespace App\APIClients;

class PriceItemsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllPriceItems()
    {
        $response = $this->get('price_items');
        $result = $this->decoder->decode($response->getBody());

        $price_items = [];
        if ($result->success)
        {
            $price_items = $result->price_items;
        }
        return $price_items;
    }
}