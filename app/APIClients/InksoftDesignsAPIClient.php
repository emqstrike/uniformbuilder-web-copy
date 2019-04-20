<?php
namespace App\APIClients;

class InksoftDesignsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/inksoft_designs');
        $result = $this->decoder->decode($response->getBody());

        $inksoft_designs = [];
        if ($result->success)
        {
            $inksoft_designs = $result->inksoft_designs;
        }
        return $inksoft_designs;
    }

    public function createDesign($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/inksoft_design', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());

    }

    public function updateDesign($data)
    {
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/inksoft_design/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function show($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/inksoft_design/' . $id);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            $inksoft_designs = $result->inksoft_designs;
            return $inksoft_designs;
        }
        return null;
    }

    public function getByDesignID($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/inksoft_design/getByDesignID/' . $id);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            $inksoft_designs = $result->inksoft_designs;
            return $inksoft_designs;
        }
        return null;
    }

    public function getPaginated($current_page, $user_id)
    {
        $user = '';
        if (!is_null($user_id)) {
            $user = '&user_id=' . $user_id;
        }

        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/inksoft_designs/paginate?page='.$current_page . $user);
        $result = $this->decoder->decode($response->getBody());
        $inksoft_designs = [];
        if ($result->success)
        {
            $inksoft_designs = [
                'inksoft_designs' => $result->inksoft_designs,
                'users' => $result->users
            ];

        }
        return $inksoft_designs;
    }
}
