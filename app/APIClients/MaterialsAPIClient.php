<?php
namespace Customizer\APIClients;

class MaterialsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getMaterials($filter = null)
    {
        $response = $this->get('materials/' . $filter);
        $result = $this->decoder->decode($response->getBody());

        $materials = [];
        if ($result->success)
        {
            $materials = $result->materials;
        }
        return $materials;
    }

    public function getUpperBodyUniforms()
    {
        return $this->getMaterials('upper');
    }

    public function getLowerBodyUniforms()
    {
        return $this->getMaterials('lower');
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

    public function updatePipings($data)
    {
        $response = $this->post('material/updatePipings', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function updatePiping($data, $page_number)
    {
        if($page_number == 1)
        {
            $url = 'material/updatePiping';
        }
        elseif($page_number == 2)
        {
            $url = 'material/updatePiping2';
        }
        elseif($page_number == 3)
        {
            $url = 'material/updatePiping3';
        }
        elseif($page_number == 4)
        {
            $url = 'material/updatePiping4';
        }

        $response = $this->post($url, [
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

            $response_options = $this->get('materials_options/' . $id);
            $options = $this->decoder->decode($response_options->getBody());

            $material = $result->material;
            $material->options = $options;

            return $material;

        }

        return null;
    }

    public function getMaterialQS($id)
    {
        $response = $this->get('material/qs/' . $id);
        $result = $this->decoder->decode($response->getBody());
        
        if ($result->success)
        {
            $material = $result->material;
            return $material;
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