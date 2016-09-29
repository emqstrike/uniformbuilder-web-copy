<?php
namespace App\APIClients;

class MobileNotificationsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function createMobileNotification($data)
    {

        $response = $this->post('newsletter', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    //    public function getAllAccents()
    // {
    //     $response = $this->get('accents');
    //     $result = $this->decoder->decode($response->getBody());

    //     $accents = [];
    //     if ($result->success)
    //     {
    //         $accents = $result->accents;
    //     }
        
    //     return $accents;
    // }
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