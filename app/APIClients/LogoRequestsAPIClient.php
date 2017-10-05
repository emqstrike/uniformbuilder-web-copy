<?php
namespace App\APIClients;

class LogoRequestsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getLogoRequest($id)
    {
        $response = $this->get(env('ENDPOINT_VERSION','v1-0').'/'.'logo_request/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->logo_request;
        }
        return null;
    }

    public function getLogoRequests($status = null)
    {
        $endpoint = env('ENDPOINT_VERSION','v1-0').'/logo_requests';
        if (!is_null($status))
        {
            $endpoint .= '/' . $status;
        }
        $response = $this->get($endpoint);
        $result = $this->decoder->decode($response->getBody());

        $logo_requests = [];
        if ($result->success)
        {
            $logo_requests = $result->logo_requests;
        }
        return $logo_requests;
    }

    public function updateLogoRequest($data)
    {
        // dd(json_encode($data));
        $response = $this->post(env('ENDPOINT_VERSION','v1-0').'/'.'logo_request/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

}