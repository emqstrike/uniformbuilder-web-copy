<?php
namespace App\APIClients;

class StylesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/qx7_styles');
        $result = $this->decoder->decode($response->getBody());

        $styles = [];
        if ($result->success)
        {
            $styles = $result->styles;
        }
        return $styles;
    }

    public function getStyle($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/qx7_style/' .$id);
        $result = $this->decoder->decode($response->getBody());

        $style = [];
        if ($result->success)
        {
            $style = $result->style;
        }
        return $style;
    }

    public function createStylex($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/qx7_style/create', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function updateStyle($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/qx7_style/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function updatePipings($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'qx7_style/updatePipings', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

}
