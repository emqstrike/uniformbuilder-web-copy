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

    public function createStyleIndex($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/styles_index', [
            'json' => $data
        ]);      
        return $this->decoder->decode($response->getBody());
        
    }

    public function updateStyleIndex($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/style_index/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }
    
    public function show($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/style_index/' . $id);
        $result = $this->decoder->decode($response->getBody());
        
        if ($result->success)
        {
            $styles_indexes = $result->style_index;
            return $styles_indexes;
        }
        return null;
    }

    public function getByStyleID($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/style_index_items/' . $id);
        $result = $this->decoder->decode($response->getBody());
        
        if ($result->success)
        {
            $styles_indexes = $result->style_index_item;
            return $styles_indexes;
        }
        return null;
    }

}