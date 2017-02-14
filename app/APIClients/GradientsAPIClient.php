<?php
namespace Customizer\APIClients;

class GradientsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function isExist($name, $id = null)
    {
        $gradient = $this->getByName($name);
        if (!is_null($gradient) && !is_null($id))
        {
            $compare = $this->getGradient($id);
            if ($gradient->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($gradient);
    }

    public function createGradient($data)
    {
        $response = $this->post('gradient', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function updateGradient($data)
    {
        $response = $this->post('gradient/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getGradients()
    {
        $response = $this->get('gradients');
        $result = $this->decoder->decode($response->getBody());

        $gradients = [];
        if ($result->success)
        {
            $gradients = $result->gradients;
        }
        return $gradients;
    }

    public function getGradient($id)
    {
        $response = $this->get('gradient/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->gradient;
        }
        return null;
    }

    public function getByName($name)
    {
        $response = $this->get('gradient/name/' . $name);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->gradient;
        }
        return null;
    }
}