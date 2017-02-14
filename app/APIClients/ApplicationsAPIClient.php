<?php
namespace Customizer\APIClients;

class ApplicationsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getApplications()
    {
        $response = $this->get('applications');
        $result = $this->decoder->decode($response->getBody());

        $applications = [];
        if ($result->success)
        {
            $applications = $result->applications;
        }
        return $applications;
    }
}