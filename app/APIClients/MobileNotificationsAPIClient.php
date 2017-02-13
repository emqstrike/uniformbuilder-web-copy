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
}