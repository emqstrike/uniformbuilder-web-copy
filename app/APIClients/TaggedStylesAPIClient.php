<?php
namespace App\APIClients;

class TaggedStylesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get('tagged_styles');
        $result = $this->decoder->decode($response->getBody());

        $tagged_styles = [];
        if ($result->success)
        {
            $tagged_styles = $result->tagged_styles;
        }

        return $tagged_styles;
    }

}
