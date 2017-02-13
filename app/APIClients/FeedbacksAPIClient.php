<?php
namespace App\APIClients;

class FeedbacksAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get('feedbacks');
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->feedbacks;
        }

        return null;
    }

    public function getFeedback($id)
    {

        $response = $this->get('feedback/'.$id);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->feedback;
        }

        return null;
    }
}