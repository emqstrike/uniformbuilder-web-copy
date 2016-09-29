<?php
namespace App\APIClients;

class NewsLettersAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    // public function createMobileNotification($data)
    // {

    //     $response = $this->post('newsletter', [
    //         'json' => $data
    //     ]);
    //     return $this->decoder->decode($response->getBody());
    // }

       public function getNewsLetters()
    {
        $response = $this->get('newsletters');
        $result = $this->decoder->decode($response->getBody());

        $newsletters = [];
        if ($result->success)
        {
            $newsletters = $result->newsletters;
        }
        
        return $newsletters;
    }
    //  public function getAccent($id)
    // {
    //     $response = $this->get('accent/' . $id);
    //     $result = $this->decoder->decode($response->getBody());
    //     if ($result->success)
    //     {

    //         return $result->accent;
    //     }
    //     return null;
    // }
}