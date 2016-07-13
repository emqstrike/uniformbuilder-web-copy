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
        // $data['colors'] = json_encode($data['colors']);
        // dd($data);
        $response = $this->post('color_set', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }
    
}