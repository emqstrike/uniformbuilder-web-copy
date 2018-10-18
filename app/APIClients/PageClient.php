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
        return $this->decoder->decode($response->getBody());
    }

    public function create($data)
    {
        $response = $this->post('page', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function update($data)
    {
        $response = $this->patch("page/{$data['id']}/update", [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getPage($id)
    {
        $response = $this->get("page/{$id}");

        return $this->decoder->decode($response->getBody());
    }

    public function deletePage($id)
    {
        $response = $this->get("page/{$id}/delete");
        return $this->decoder->decode($response->getBody());
    }

    public function getByBrand($brand)
    {
        $response = $this->get("pages/get_by_brand/{$brand}");
        return $this->decoder->decode($response->getBody());
    }
}