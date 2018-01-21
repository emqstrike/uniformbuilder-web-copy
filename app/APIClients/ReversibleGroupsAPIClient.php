<?php
namespace App\APIClients;

class ReversibleGroupsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function create($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/reversible_groups', [
            'json' => $data
        ]);
       return $this->decoder->decode($response->getBody());
    }

    public function update($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/reversible_groups/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function getAll()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/reversible_groups');
        $result = $this->decoder->decode($response->getBody());

        $reversible_groups = [];
        if ($result->success)
        {
            $reversible_groups = $result->reversible_groups;
        }

        return $reversible_groups;
    }

    public function getReversibleGroups($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/reversible_groups/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->reversible_groups;
        }
        return null;
    }
}
