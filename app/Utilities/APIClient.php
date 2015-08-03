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

    public function createMaterial($materialData)
    {
        $response = $this->post('material', [
            'json' => $materialData
        ]);
        return $this->decoder->decode($response->getBody());
    }

    /**
     * @name String $name Slug Name
     */
    public function getMaterial($name)
    {
        $response = $this->get('material/' . $name);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->material;
        }
        return null;
    }

    public function isMaterialExist($name)
    {
        return !is_null($this->getMaterial($name));
    }

    public function deleteMaterial($id)
    {
        $response = $this->get('material/delete/' . $id);
        return $this->decoder->decode($response->getBody());
    }
}