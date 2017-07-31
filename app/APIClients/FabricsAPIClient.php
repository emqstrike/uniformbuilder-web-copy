<?php
namespace App\APIClients;

class FabricsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getFabric($id)
    {
        $response = $this->get('fabric/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->fabric;
        }
        return null;
    }

    public function getFabrics()
    {
        $response = $this->get('fabrics');
        $result = $this->decoder->decode($response->getBody());

        $fabrics = [];
        if ($result->success)
        {
            $fabrics = $result->fabrics;
        }
        return $fabrics;
    }

    public function isFabricNameTaken($name, $id = null)
    {
        $response = $this->get('fabric/name/' . $name);
        $result = $this->decoder->decode($response->getBody());

        $fabric = null;
        if ($result->success)
        {
            $fabric = $result->fabric;
        }
        else
        {
            return false;
        }

        if (!is_null($fabric) && !is_null($id))
        {
            $compare = $this->getfabric($id);
            if ($fabric->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($fabric);
    }

    public function getFabricByCode($code)
    {
        $response = $this->get('fabric/code/' . $code);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->fabric;
        }
        else
        {
            return false;
        }
        return null;
    }

    public function isFabricCodeTaken($code, $id = null)
    {
        $response = $this->get('fabric/code/' . $code);
        $result = $this->decoder->decode($response->getBody());

        $fabric = null;
        if ($result->success)
        {
            $fabric = $result->fabric;
        }
        else
        {
            return false;
        }

        if (!is_null($fabric) && !is_null($id))
        {
            $compare = $this->getfabric($id);
            if ($fabric->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($fabric);
    }

    public function getFabricByName($name)
    {
        $response = $this->get('fabric/name/' . $name);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->fabric;
        }
        return null;
    }

    public function createFabric($data)
    {
        $response = $this->post('fabric', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateFabric($data)
    {
        $response = $this->post('fabric/update', [
            'json' => $data
        ]);
        
        return $this->decoder->decode($response->getBody());
    }
}