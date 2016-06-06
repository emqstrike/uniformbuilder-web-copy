<?php
namespace App\APIClients;

class PlaceholdersAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    // public function getPatterns()
    // {
    //     $response = $this->get('patterns');
    //     $result = $this->decoder->decode($response->getBody());

    //     $patterns = [];
    //     if ($result->success)
    //     {
    //         $patterns = $result->patterns;
    //     }
    //     return $patterns;
    // }

    public function createPlaceholder($data)
    { // dd($data);
        $response = $this->post('placeholder', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }
}