<?php
namespace Customizer\APIClients;

class MockupSetsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getMockupSets()
    {
        $response = $this->get('mockup_sets');
        $result = $this->decoder->decode($response->getBody());

        $mockup_sets = [];
        if ($result->success)
        {
            $mockup_sets = $result->mockup_sets;
        }
        return $mockup_sets;
    }

    public function getMockupSet($id)
    {
        $response = $this->get('mockup_set/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->mockup_set;
        }
        return null;
    }

  
    
}