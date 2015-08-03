<?php

namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\APIClient;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Utilities\MaterialUploader;
use App\Http\Controllers\Controller;

class MaterialsController extends Controller
{
    protected $client;

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
        $this->client = new APIClient($settings);
    }

    /**
     * Materials
     */
    public function index()
    {
        $materials = $this->client->getMaterials();

        return view('administration/materials', [
            'materials' => $materials,
            'api_host' => env('API_HOST')
        ]);
    }

    public function delete($id)
    {
        return $this->client->deleteMaterial($id);
    }

    public function addMaterialForm()
    {
        return view('administration/material-create');
    }

    public function createMaterial(Request $request)
    {
        $factoryCode = $request->input('factory_code');
        $materialName = $request->input('name');
        $slug = MaterialUploader::makeSlug($materialName);

        // Does this Material Exist
        $response = $this->client->get('material/' . $slug);
        $decoder = new JsonDecoder();
        $result = $decoder->decode($response->getBody());
        if (!$result->success)
        {
            $materialData = [
                'name' => $materialName,
                'material_path' => null,
                'bump_map_path' => null,
                'factory_code' => $factoryCode,
                'thumbnail_path' => null
            ];
            // Bump Map File
            $bumpMapFile = $request->file('bump_map_path');
            $materialFile = $request->file('material_path');

            $bumpMapPath = '';
            if (is_object($bumpMapFile))
            {
                if ($bumpMapFile->isValid())
                {
                    $materialData['bump_map_path'] = MaterialUploader::upload($bumpMapFile, $materialName, 'bump');
                }
            }

            // Material Material File
            $materialFile = $request->file('material_path');

            $materialPath = '';
            $thumbnailPath = '';
            if (is_object($materialFile))
            {
                if ($materialFile->isValid())
                {
                    $materialData['material_path'] = MaterialUploader::upload($materialFile, $materialName);
                    // Thumbnail
                    $materialData['thumbnail_path'] = MaterialUploader::upload($materialFile, $materialName, 'thumbnail');
                    error_log('THUMBNAIL: ' .$thumbnailPath);
                }
            }

            $response = $this->client->createMaterial($materialData);

            $decoder = new JsonDecoder();
            $result = $decoder->decode($response->getBody());
            if ($result->success)
            {
                return Redirect::to('administration/materials')
                                ->with('message', 'Successfully saved new material');
            }
            else
            {
                return Redirect::to('administration/materials')
                                ->with('message', 'There was a problem saving your material');
            }
        }

        return [
            'success' => false,
            'message' => 'Material Name already exists'
        ];
    }
}
