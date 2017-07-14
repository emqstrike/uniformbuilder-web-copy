<?php
namespace App\APIClients;

class SalesRepresentativesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getSalesReps()
    {
        $response = $this->get('sales_reps');
        $result = $this->decoder->decode($response->getBody());

        $sales_reps = [];
        if ($result->success)
        {
            $sales_reps = $result->sales_reps;
        }
        return $sales_reps;
    }
}