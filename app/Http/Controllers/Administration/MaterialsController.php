<?php

namespace App\Http\Controllers\Administration;

use \Session;
use GuzzleHttp\Client;
use App\Http\Requests;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Utilities\MaterialUploader;
use App\Http\Controllers\Controller;

class MaterialsController extends Controller
{
    protected $client;
    protected $apiHost;

    public function __construct($accessToken = null)
    {
        $settings = [
            'base_uri' => 'http://' . getenv('API_HOST') . '/api/',
        ];
        if (!is_null($accessToken))
        {
            $settings['headers'] = [
                'accessToken' => $accessToken
            ];
        }
        $this->client = new Client($settings);
    }

    /**
     * Materials
     */
    public function index()
    {
        $response = $this->client->get('materials');
        $decoder = new JsonDecoder();
        $result = $decoder->decode($response->getBody());

        $materials = [];
        if ($result->success)
        {
            $materials = $result->materials;
        }

        return view('administration/materials', [
            'materials' => $materials
        ]);
    }

    public function delete($id)
    {
        $response = $this->client->get('Material/delete/' . $id);
        return $response;
    }

    public function addMaterialForm()
    {
        return view('administration/Material-create');
    }

    public function createMaterial(Request $request)
    {
        $materialName = $request->input('name');
        $slug = str_replace(' ', '-', strtolower($materialName));
        $response = $this->client->get('material/' . $slug);
        $decoder = new JsonDecoder();
        $result = $decoder->decode($response->getBody());

        if (!$result->success)
        {
            $destinationPath = '/tmp/';

            // Material Material File
            $materialFile = $request->file('material_path');
            $materialPath = '';
            if (is_object($materialFile))
            {
                if ($materialFile->isValid())
                {
                    $materialPath = MaterialUploader::upload($materialFile, $materialName);
                }
            }

            // Bump Map File
            $bumpMapFile = $request->file('bump_map_path');
            $bumpMapPath = '';
            if (is_object($bumpMapFile))
            {
                if ($bumpMapFile->isValid())
                {
                    $bumpMapPath = MaterialUploader::upload($bumpMapFile, $materialName);
                }
            }

            $response = $this->client->post('material', [
                'json' => [
                    'name' => $materialName,
                    'material_path' => $materialPath,
                    'bump_map_path' => $bumpMapPath
                ]
            ]);

            return $response;
        }

        return [
            'success' => false,
            'message' => 'Material Name already exists'
        ];
    }
}
