<?php
namespace App\APIClients;

class FactoriesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getFactory($id)
    {
        $response = $this->get('factory/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->factory;
        }
        return null;
    }

    public function getFactories()
    {
        $response = $this->get('factories');
        $result = $this->decoder->decode($response->getBody());

        $factories = [];
        if ($result->success)
        {
            $factories = $result->factories;
        }
        return $factories;
    }

    public function isFactoryTaken($name, $id = null)
    {
        $response = $this->get('factory/name/' . $name);
        $result = $this->decoder->decode($response->getBody());

        $factory = null;
        if ($result->success)
        {
            $factory = $result->factory;
        }

        if (!is_null($factory) && !is_null($id))
        {
            $compare = $this->getFactory($id);
            if ($factory->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($factory);
    }

    public function getFactoryByName($name)
    {
        $response = $this->get('factory/name/' . $name);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->factory;
        }
        return null;
    }

    public function createFactory($data)
    {
        $response = $this->post('factory', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateFactory($data)
    {
        $response = $this->post('factory/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

}