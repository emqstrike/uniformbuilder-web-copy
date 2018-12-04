<?php
namespace App\APIClients;

class PointsOfMeasuresAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get('v1-0/points_of_measures');
        $result = $this->decoder->decode($response->getBody());

        $points_of_measures = [];
        if ($result->success)
        {
            $points_of_measures = $result->points_of_measures;
        }

        return $points_of_measures;
    }

}
