<?php
namespace App\APIClients;

class ColorsSetsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getColorsSets()
    {

        $response = $this->get('colors_sets');
        $result = $this->decoder->decode($response->getBody());

        $colors_sets = [];
        if ($result->success)
        {
            $colors_sets = $result->colors_sets;
        }

        return $colors_sets;
    }

    public function createColorsSet($data)
    {
        $response = $this->post('color_set', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function updateColorsSet($data)
    {
        $response = $this->post('color_set/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function show($id)
    {
        $response = $this->get('color_set/' . $id);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            $color_set = $result->color_set;
            return $color_set;
        }
        return null;
    }

    public function getColorSetByBrand($brand = null)
    {

        $response = $this->get('colors_sets/' . $brand);
        $result = $this->decoder->decode($response->getBody());

        $colors_sets = [];
        if ($result->success)
        {
            $colors_sets = $result->colors_sets;
        }

        return $colors_sets;
    }

}
