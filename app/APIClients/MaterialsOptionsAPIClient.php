<?php
namespace App\APIClients;
use App\Utilities\Log;

class MaterialsOptionsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getMaterialsOptions()
    {
        $response = $this->get('materials_options');
        $result = $this->decoder->decode($response->getBody());

        $materials_options = [];
        if ($result->success)
        {
            $materials_options = $result->materials_options;
        }dd($materials_options);
        return $materials_options;
    }

    public function create($data)
    {
        $response = $this->post('material_option', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function createMultiple($data)
    {
        Log::info('createMultiple - API Client');
        $response = $this->post('material_option_multiple', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function update($data)
    {
        $response = $this->post('material_option/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getMaterial($id)
    {
        $response = $this->get('material_option/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->material_option;
        }
        return null;
    }

    public function getByName($name)
    {
        $response = $this->get('material_option/name/' . $name);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->material_option;
        }
        return null;
    }

    public function getByMaterialId($materialId)
    {
        $response = $this->get('materials_options/' . $materialId);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->materials_options;
        }
        return null;
    }

    public function isExist($name, $id = null)
    {
        $material_option = $this->getByName($name);
        if (!is_null($material_option) && !is_null($id))
        {
            $compare = $this->getMaterial($id);
            if ($material_option->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($material_option);
    }
}