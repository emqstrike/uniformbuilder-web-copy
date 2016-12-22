<?php
namespace App\APIClients;

class SavedDesignsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get('saved_designs');
        $result = $this->decoder->decode($response->getBody());

        $saved_designs = [];
        if ($result->success)
        {
            $saved_designs = $result->saved_designs;
        }
        return $saved_designs;
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