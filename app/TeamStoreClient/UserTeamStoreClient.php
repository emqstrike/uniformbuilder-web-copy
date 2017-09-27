<?php 

namespace App\TeamStoreClient;

use Log;
use App\TeamStoreClient\TeamStoreAPIClient;
use Illuminate\Http\Request;

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

    public function team_store_login($email, $password)
    {
        $response = $this->post("team-store-user/login", [
            'json' => [
                'email' => $email,
                'password' => $password
            ]
        ]);

        return $this->decoder->decode($response->getBody());
    }
}