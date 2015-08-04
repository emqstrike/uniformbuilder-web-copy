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
use Aws\S3\Exception\S3Exception;

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

    public function store(Request $request)
    {
        $factoryCode = $request->input('factory_code');
        $materialName = $request->input('name');
        $slug = MaterialUploader::makeSlug($materialName);

        // Does this Material Exist
        $isMaterialExist = $this->client->isMaterialExist($slug);

        if (!$isMaterialExist)
        {
            $data = [
                'name' => $materialName,
                'material_path' => null,
                'bump_map_path' => null,
                'shadow_path' => null,
                'highlight_path' => null,
                'factory_code' => $factoryCode,
                'thumbnail_path' => null
            ];


            try {
                // Bump Map File
                $bumpMapFile = $request->file('bump_map_path');
                if (is_object($bumpMapFile))
                {
                    if ($bumpMapFile->isValid())
                    {
                        $data['bump_map_path'] = MaterialUploader::upload(
                                                        $bumpMapFile,
                                                        $materialName,
                                                        'bump'
                                                    );
                    }
                }

                // Material File
                $materialFile = $request->file('material_path');
                if (is_object($materialFile))
                {
                    if ($materialFile->isValid())
                    {
                        // Material
                        $data['material_path'] = MaterialUploader::upload(
                                                        $materialFile,
                                                        $materialName
                                                    );
                        // Thumbnail
                        $data['thumbnail_path'] = MaterialUploader::upload(
                                                        $materialFile,
                                                        $materialName,
                                                        'thumbnail'
                                                    );
                    }
                }

                // Shadow File
                $shadowFile = $request->file('shadow_path');
                if (is_object($shadowFile))
                {
                    if ($shadowFile->isValid())
                    {
                        // Shadow
                        $data['shadow_path'] = MaterialUploader::upload(
                                                    $shadowFile,
                                                    $materialName,
                                                    'shadow'
                                                );
                    }
                }

                // Highlight File
                $highlightFile = $request->file('highlight_path');
                if (is_object($highlightFile))
                {
                    if ($highlightFile->isValid())
                    {
                        // Highlight
                        $data['highlight_path'] = MaterialUploader::upload(
                                                        $highlightFile,
                                                        $materialName,
                                                        'highlight'
                                                    );
                    }
                }
            }
            catch (S3Exception $e)
            {
                $message = $e->getMessage();
                return Redirect::to('administration/materials')
                                ->with('message', 'There was a problem uploading your files');
            }
            $response = $this->client->createMaterial($data);

            if ($response->success)
            {
                return Redirect::to('administration/materials')
                                ->with('message', $response->message);
            }
            else
            {
                return Redirect::to('administration/materials')
                                ->with('message', 'There was a problem saving your material');
            }
        }

        return Redirect::to('administration/materials')
                        ->with('message', 'Material Name already exists');

    }
}
