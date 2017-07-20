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

    public function createSalesRep($data)
    {
        $response = $this->post('sales_reps/store', [
                'json' => $data
            ]);
        return $this->decoder->decode($response->getBody());
    }

    public function show($id)
    {
        $response = $this->get('sales_rep/get_by_id/' . $id);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            $rep = $result->sales_rep;
            return $rep;
        }
        return null;
    }

    public function updateSalesRep($data)
    {
        $response = $this->post('sales_rep/update', [
                'json' => $data
            ]);
        return $this->decoder->decode($response->getBody());
    }
}