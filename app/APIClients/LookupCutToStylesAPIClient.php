<?php
namespace App\APIClients;

class LookupCutToStylesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getLookupCutToStyles()
    {
        $response = $this->get('lookup_cut_to_styles');
        $result = $this->decoder->decode($response->getBody());

        $lookup_to_styles = [];
        if ($result->success)
        {
            $lookup_to_styles = $result->lookup_to_styles;
        }
        return $lookup_to_styles;
    }

    public function createLookupCutToStylesMultiple($data)
    {
        $response = $this->post('lookup_cut_to_style/multiple', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function importFromSheets()
    {
        $response = $this->get('lookup_cut_to_styles/import');
        $result = $this->decoder->decode($response->getBody());

        $lookup_to_styles = [];
        if ($result->success)
        {
            $lookup_to_styles = $result->lookup_to_styles;
        }
        return $lookup_to_styles;
    }
}