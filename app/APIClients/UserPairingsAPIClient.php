<?php
namespace App\APIClients;

class UserPairingsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/user_pairings');
        $result = $this->decoder->decode($response->getBody());

        $user_pairings = [];
        if ($result->success)
        {
            $user_pairings = $result->user_pairings;
        }
        return $user_pairings;
    }

    public function getPairingItemsByID($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/user_pairing/' .$id);
        $result = $this->decoder->decode($response->getBody());

        $user_pairings = [];
        if ($result->success)
        {
            $user_pairings = $result->user_pairing;
        }
        return $user_pairings;
    }

}
