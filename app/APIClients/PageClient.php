<?php 

namespace App\APIClients;

use Illuminate\Support\Facades\Log;

class PageClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getPages()
    {
        $response = $this->get('pages');
        $result = $this->decoder->decode($response->getBody());

        if ($result->success) {
            return $result;
        }

        return null;
    }

    public function create($data)
    {
        $response = $this->post('page', [
            'json' => $data
        ]);

        $result = $this->decoder->decode($response->getBody());

        if ($result->success) {
            return $result;
        }

        return null;
    }

    public function update($data)
    {
        $response = $this->patch("page/{$data['id']}/update", [
            'json' => $data
        ]);

        $result = $this->decoder->decode($response->getBody());

        if ($result->success) {
           return $result;
        }

        return null;
    }

    public function getPage($id)
    {
        $response = $this->get("page/{$id}");

        $result = $this->decoder->decode($response->getBody());

        if ($result->success) {
            return $result;
        }

        return null;
    }

    public function deletePage($id)
    {
        $response = $this->get("page/{$id}/delete");
        return $this->decoder->decode($response->getBody());
    }
}