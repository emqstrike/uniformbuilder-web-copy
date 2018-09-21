<?php
namespace App\APIClients;

use Illuminate\Support\Facades\Log;

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

    public function getTotalCount()
    {
        $response = $this->get('materials/total_count');
        $result = $this->decoder->decode($response->getBody());

        $count = 0;

        if ($result->success) {
            $count = $result->count;
        }

        return $count;
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

    public function updateRandomFeed($data)
    {
        $response = $this->post('material/updateRandomFeed', [
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

    public function getFootballMaterials()
    {
        $response = $this->get('materials/category/Football');
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->materials;
        }
        return null;
    }

    public function getMaterialsBySport($sport)
    {
        $response = $this->get('materials/optimized/category/' . $sport);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->materials;
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

    public function updateLogoPosition($data)
    {
        $response = $this->post('material/updateLogoPosition', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function updateGradient($data)
    {
        $response = $this->post('material/updateGradient', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }
}
