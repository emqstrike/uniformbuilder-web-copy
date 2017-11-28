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

    public function getStats($year = null, $month = null, $day = null)
    {
        $endpoint = 'stats/saved-designs/' . $year;
        if (!is_null($month))
        {
            $endpoint .= '/' . $month;
            if (!is_null($day))
            {
                $endpoint .= '/' . $day;
            }
        }

        $response = $this->get($endpoint);
        $result = $this->decoder->decode($response->getBody());

        $saved_designs = [];
        if ($result->success)
        {
            $saved_designs = $result->saved_designs;
        }
        return $saved_designs;
    }

    public function getByUserId($id = null)
    {
        $response = $this->get('saved_design/getByUserId/' . $id);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->saved_designs;
        }

        return null;
    }
}
