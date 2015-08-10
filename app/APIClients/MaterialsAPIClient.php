<?php
namespace App\APIClients;

class MaterialsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getMaterials()
    {
        $response = $this->get('materials');
        $result = $this->decoder->decode($response->getBody());

        $materials = [];
        if ($result->success)
        {
            $materials = $result->materials;
        }
        return $materials;
    }

    public function createMaterial($data)
    {
        $response = $this->post('material', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function updateMaterial($data)
    {
        $response = $this->post('material/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getMaterial($id)
    {
        $response = $this->get('material/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->material;
        }
        return null;
    }

    public function getMaterialByName($name)
    {
        $response = $this->get('material/name/' . $name);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->material;
        }
        return null;
    }

    public function getMaterialByCode($code)
    {
        $response = $this->get('material/code/' . $code);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->material;
        }
        return null;
    }

    public function isMaterialExist($name, $id = null)
    {
        $material = $this->getMaterialByName($name);
        if (!is_null($material) && !is_null($id))
        {
            $compare = $this->getMaterial($id);
            if ($material->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($material);
    }

    public function isMaterialCodeExist($code, $id = null)
    {
        $material = $this->getMaterialByCode($code);
        if (!is_null($material) && !is_null($id))
        {
            $compare = $this->getMaterial($id);
            if ($material->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($material);
    }
}