<?php
namespace App\APIClients;

class SavedDesignsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getSavedDesign($id)
    {

        $response = $this->get('saved_design/' . $id);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->saved_design;
        }
        
        return null;

    }

}