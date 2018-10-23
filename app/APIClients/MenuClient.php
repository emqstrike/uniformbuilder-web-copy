<?php 

namespace App\APIClients;

use Illuminate\Support\Facades\Log;

class MenuClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function create($data)
    {
        $response = $this->post('menu', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function update($data)
    {
        $response = $this->patch("menu/{$data['id']}/update", [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getById($id)
    {
        $response = $this->get("menu/{$id}");
        return $this->decoder->decode($response->getBody());
    }

    public function delete($id)
    {
        $response = $this->get("menu/{$id}/delete");
        return $this->decoder->decode($response->getBody());
    }

    public function getAllMenus()
    {
        $response = $this->get("menus");
        return $this->decoder->decode($response->getBody());
    }

    public function getMenusByBrand($brand)
    {
        $response = $this->get("menus/brand/{$brand}");
        return $this->decoder->decode($response->getBody());
    }
}