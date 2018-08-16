<?php
namespace App\APIClients;

class MasterFontsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllFonts()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/master_fonts');
        $result = $this->decoder->decode($response->getBody());

        $fonts = [];
        if ($result->success)
        {
            $fonts = $result->fonts;
        }
        return $fonts;
    }

}