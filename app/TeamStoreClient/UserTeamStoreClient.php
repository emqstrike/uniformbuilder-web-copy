<?php 

namespace App\TeamStoreClient;

use App\TeamStoreClient\TeamStoreAPIClient;

class UserTeamStoreClient extends TeamStoreAPIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function hasTeamStoreAccount($userID)
    {
        $response = $this->get("team-store-user/{$userID}");

        return $this->decoder->decode($response->getBody());
    }
}