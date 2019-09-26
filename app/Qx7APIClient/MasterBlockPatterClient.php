<?php

namespace App\Qx7APIClient;

class MasterBlockPatterClient extends Qx7APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getMasterBlockPatterns()
    {
        $response = $this->get('master_3d_block_patterns');
        $result = $this->decoder->decode($response->getBody());

        $master_3d_block_patterns = [];

        if ($result->success) {
            $master_3d_block_patterns = $result->master_3d_block_patterns;
        }
        
        return $master_3d_block_patterns;
    }
}