<?php
namespace App\APIClients;

class PriceItemTemplatesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {

        $response = $this->get('price_item_templates');
        $result = $this->decoder->decode($response->getBody());

        $price_item_templates = [];
        if ($result->success)
        {
            $price_item_templates = $result->price_item_templates;
        }
        return $price_item_templates;

    }
}