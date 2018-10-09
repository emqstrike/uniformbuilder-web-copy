<?php
namespace App\APIClients;

use Illuminate\Support\Facades\Log;

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

    public function getLogoRequestsPaginated($currentPage, $filters)
    {
        $origin = '';
        $type = '';
        $client_name = '';
        $status = '';

        if (isset($filters['origin'])) {
            $origin = '&origin=' . $filters['origin'];
        }

        if (isset($filters['type'])) {
            $type = '&type=' . $filters['type'];
        }

        if (isset($filters['client_name'])) {
            $client_name = '&client_name=' . $filters['client_name'];
        }

        if (isset($filters['status'])) {
            $status = '&status=' . $filters['status'];
        }

        $endpoint = env('ENDPOINT_VERSION','v1-0').'/logo_requests/paginate/?page=' . $currentPage . $origin . $type . $client_name . $status;

        $response = $this->get($endpoint);
        $result = $this->decoder->decode($response->getBody());

        $logo_requests = [];

        if ($result->success) {
            return [
                'logo_requests' => $result->logo_requests->data,
                'total' => $result->logo_requests->total,
                'origins' => $result->origins,
                'types' => $result->types,
                'client_names' => $result->client_names,
                'statuses' => $result->statuses
            ];
        }

        return $logo_requests;
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