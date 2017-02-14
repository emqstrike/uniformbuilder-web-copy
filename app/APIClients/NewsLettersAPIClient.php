<?php
namespace Customizer\APIClients;

class NewsLettersAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
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