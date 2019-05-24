<?php
namespace App\APIClients;

class StyleRequestsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/style_requests');
        $result = $this->decoder->decode($response->getBody());

        $style_requests = [];
        if ($result->success)
        {
            $style_requests = $result->style_requests;
        }

        return $style_requests;
    }

    public function getApproved()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/approved_style_requests');
        $result = $this->decoder->decode($response->getBody());

        $style_requests = [];
        if ($result->success)
        {
            $style_requests = $result->style_requests;
        }

        return $style_requests;
    }

    public function stylesOnCustomizer()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/styles_on_customizer');
        $result = $this->decoder->decode($response->getBody());

        $style_requests = [];
        if ($result->success)
        {
            $style_requests = $result->style_requests;
        }

        return $style_requests;
    }

}
