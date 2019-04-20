<?php 

namespace App\APIClients;

use Illuminate\Support\Facades\Log;

class PageRuleClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getPageRules()
    {
        $response = $this->get('page_rules');
        return $this->decoder->decode($response->getBody());
    }

    public function create($data)
    {
        $response = $this->post('page_rule', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getByBrand($brand)
    {
        $response = $this->get("page_rules/brand/{$brand}");
        return $this->decoder->decode($response->getBody());
    }

    public function getPageRule($id)
    {
        $response = $this->get("page_rules/{$id}");
        return $this->decoder->decode($response->getBody());
    }

    public function update($data)
    {
        $response = $this->patch("page_rules/{$data['id']}/update", [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function delete($id)
    {
        $response = $this->get("page_rules/{$id}/delete");
        return $this->decoder->decode($response->getBody());
    }
}