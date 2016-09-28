<?php
namespace App\APIClients;

class FeatureFlagsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    // public function getBlockPattern($id)
    // {
    //     $response = $this->get('block_pattern/' . $id);
    //     $result = $this->decoder->decode($response->getBody());
    //     if ($result->success)
    //     {
    //         return $result->block_pattern;
    //     }
    //     return null;
    // }

    public function getFeatureFlags()
    {
        $response = $this->get('features');
        $result = $this->decoder->decode($response->getBody());

        $features = [];
        if ($result->success)
        {
            $features = $result->features;
        }
        return $features;
    }

    public function createFeatureFlag($data)
    {
        $response = $this->post('feature', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }
}