<?php
namespace App\APIClients;

class StyleIndexItemsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/styles_indexes');
        $result = $this->decoder->decode($response->getBody());

        $styles_indexes = [];
        if ($result->success)
        {
            $styles_indexes = $result->styles_indexes;
        }        
        return $styles_indexes;        
    }

    public function createStyleIndexItem($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/style_index_item', [
            'json' => $data
        ]);      
        return $this->decoder->decode($response->getBody());
        
    }

    public function updateStyleIndexItem($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/style_index_item/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }
    
    public function show($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/style_index_item/' . $id);
        $result = $this->decoder->decode($response->getBody());
        
        if ($result->success)
        {
            $style_index_item = $result->style_index_item;
            return $style_index_item;
        }
        return null;
    }

    public function getByStyleID($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/style_index_items/' . $id);
        $result = $this->decoder->decode($response->getBody());
        
        if ($result->success)
        {
            $style_index_item = $result->style_index_item;
            return $style_index_item;
        }
        return null;
    }

}