<?php
namespace App\APIClients;

class MessagesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getByRecipient($id)
    {
        $response = $this->get('messages/recipient/'.$id);
        $result = $this->decoder->decode($response->getBody());

        $messages = [];
        if ($result->success)
        {
            $messages = $result->messages;
        }
        return $messages;
    }
}