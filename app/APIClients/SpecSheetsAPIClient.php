<?php
namespace App\APIClients;

class SpecSheetsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get('v1-0/spec_sheets');
        $result = $this->decoder->decode($response->getBody());

        $spec_sheets = [];
        if ($result->success)
        {
            $spec_sheets = $result->spec_sheets;
        }

        return $spec_sheets;
    }

}
