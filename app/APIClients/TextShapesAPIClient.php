<?php
namespace App\APIClients;

class TextShapesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function createTextShape($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/text_shape', [
            'json' => $data
        ]);
       return $this->decoder->decode($response->getBody());
    }

    public function updateTextShape($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/text_shape/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function getAllTextShapes()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/text_shapes');
        $result = $this->decoder->decode($response->getBody());

        $text_shapes = [];
        if ($result->success)
        {
            $text_shapes = $result->text_shapes;
        }

        return $text_shapes;
    }

    public function getTextShape($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/text_shape/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->text_shape;
        }
        return null;
    }

    public function checkFontExists($data)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/text_shapes/check_font_name', [
            'json' => $data
        ]);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->font_exists;
        }
        return null;
    }
}