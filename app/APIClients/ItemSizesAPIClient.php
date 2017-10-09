<?php
namespace App\APIClients;

class ItemSizesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get('item_sizes');
        $result = $this->decoder->decode($response->getBody());

        $item_sizes = [];
        if ($result->success)
        {
            $item_sizes = $result->item_sizes;
        }        
        return $item_sizes;
    }

    public function createItemSize($data)
    {
        $response = $this->post('item_size', [
            'json' => $data
        ]);      
        return $this->decoder->decode($response->getBody());
        
    }

    public function updateItemSize($data)
    {
        $response = $this->post('item_size/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }
    
    public function show($id)
    {
        $response = $this->get('item_size/' . $id);
        $result = $this->decoder->decode($response->getBody());
        
        if ($result->success)
        {
            $item_sizes = $result->item_sizes;
            return $item_sizes;
        }
        return null;
    }

}