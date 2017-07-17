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

    public function create($data)
    {
        $response = $this->post('price_item_template', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function getTemplate($id)
    {
        $response = $this->get('price_item_template/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->template;
        }
        return null;
    }

    public function updateTemplate($data)
    {
        $response = $this->post('price_item_template/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }
}