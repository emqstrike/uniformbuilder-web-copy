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

    public function getSpecSheet($id)
    {
        $response = $this->get('v1-0/spec_sheet/'. $id);
        $result = $this->decoder->decode($response->getBody());

        $spec_sheet = [];
        if ($result->success)
        {
            $spec_sheet = $result->spec_sheet;
        }

        return $spec_sheet;
    }

}
