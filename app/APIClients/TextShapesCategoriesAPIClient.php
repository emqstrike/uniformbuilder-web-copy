<?php
namespace App\APIClients;

class TextShapesCategoriesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function create($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/pipings/create', [
            'json' => $data
        ]);
       return $this->decoder->decode($response->getBody());
    }

    public function update($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/pipings/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function getAll()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/text_shapes_categories');
        $result = $this->decoder->decode($response->getBody());

        $text_shapes_categories = [];
        if ($result->success)
        {
            $text_shapes_categories = $result->text_shapes_categories;
        }

        return $text_shapes_categories;
    }

    public function get($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/text_shapes_category/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->text_shapes_category;
        }
        return null;
    }
}
