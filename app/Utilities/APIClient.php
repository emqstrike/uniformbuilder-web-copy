<?php
namespace App\Utilities;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Webmozart\Json\JsonDecoder;
use GuzzleHttp\Exception\ClientException;
use \Session;

class APIClient extends Client
{
    protected $decoder;

    public function __construct($accessToken = null)
    {
        $settings = [
            'base_uri' => 'http://' . getenv('API_HOST') . '/api/'
        ];
        if (!is_null($accessToken))
        {
            $settings['headers'] = [
                'accessToken' => $accessToken
            ];
        }
        parent::__construct($settings);
        $this->decoder = new JsonDecoder();
    }

    public function getUniformCategories()
    {
        $response = $this->get('categories');
        $result = $this->decoder->decode($response->getBody());

        $categories = [];
        if ($result->success)
        {
            $categories = $result->categories;
        }
        return $categories;
    }

    public function isColorExist($name, $id = null)
    {
        $color = $this->getColorByName($name);
        if (!is_null($color) && !is_null($id))
        {
            $compare = $this->getColor($id);
            if ($color->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($color);
    }

    public function isColorCodeExist($code, $id = null)
    {
        $color = $this->getColorByCode($code);
        if (!is_null($color) && !is_null($id))
        {
            $compare = $this->getColor($id);
            if ($color->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($color);
    }

    public function createColor($data)
    {
        $response = $this->post('color', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function updateColor($data)
    {
        $response = $this->post('color/' . $data['id'], [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getColors()
    {
        $response = $this->get('colors');
        $result = $this->decoder->decode($response->getBody());

        $colors = [];
        if ($result->success)
        {
            $colors = $result->colors;
        }
        return $colors;
    }

    public function getColor($id)
    {
        $response = $this->get('color/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->color;
        }
        return null;
    }

    public function getColorByName($name)
    {
        $response = $this->get('color/name/' . $name);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->color;
        }
        return null;
    }

    public function getColorByCode($code)
    {
        $response = $this->get('color/code/' . $code);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->color;
        }
        return null;
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
error_log(print_r($data, true));
        $response = $this->post('material', [
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

    public function deleteMaterial($id)
    {
        $response = $this->get('material/delete/' . $id);
        return $this->decoder->decode($response->getBody());
    }
}