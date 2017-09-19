<?php
namespace App\APIClients;

class MascotSizesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function createMascotSize($data)
    {
        $response = $this->post('mascot_size', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateMascotSize($data)
    {     
        $response = $this->post('mascot_size/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getMascotSizes()
    {
        $response = $this->get('mascot_sizes');
        $result = $this->decoder->decode($response->getBody());

        $mascot_sizes = [];
        if ($result->success)
        {
            $mascot_sizes = $result->mascot_sizes;
        }
        return $mascot_sizes;
    }

    public function getMascotSize($id)
    {
        $response = $this->get('mascot_size/' . $id);

        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->mascot_size;
        }
        return null;
    }
}