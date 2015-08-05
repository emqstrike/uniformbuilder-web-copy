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

    public function editMaterialForm($id)
    {
        $material = $this->client->getMaterial($id);
        return view('administration/material-edit', [
            'material' => $material
        ]);
    }

    public function addMaterialForm()
    {
        return view('administration/material-create');
    }

    public function store(Request $request)
    {
        $materialName = $request->input('name');
        $materialCode = $request->input('code');
        $factoryCode = $request->input('factory_code');
        $slug = MaterialUploader::makeSlug($materialName);

        $materialId = null;
        if (!empty($request->input('material_id')))
        {
            $materialId = $request->input('material_id');
        }

        // Does the Material Name and Codes Exist?
        if ($this->client->isMaterialExist($materialName, $materialId))
        {
            return Redirect::to('administration/materials')
                            ->with('message', 'Material Name already exists');
        }
        if ($this->client->isMaterialCodeExist($materialCode, $materialId))
        {
            return Redirect::to('administration/materials')
                            ->with('message', 'Material Code already exists');
        }

        $data = [
            'id' => $materialId,
            'name' => $materialName,
            'slug' => $slug,
            'code' => $materialCode,
            'factory_code' => $factoryCode
        ];

        try {
            // Bump Map File
            $bumpMapFile = $request->file('bump_map_path');
            if (isset($bumpMapFile))
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
            if (isset($materialFile))
            {
                if ($materialFile->isValid())
                {
                    // Material
                    $data['material_path'] = MaterialUploader::upload(
                                                    $materialFile,
                                                    $materialName
                                                );
                    // Generate a Thumbnail from the Base Material ONLY IF no thumbnail will be uploaded
                    if (is_null($request->file('thumbnail_path')))
                    {
                        // Thumbnail
                        $data['thumbnail_path'] = MaterialUploader::upload(
                                                        $materialFile,
                                                        $materialName,
                                                        'thumbnail'
                                                    );
                    }
                }
            }

            // Shadow File
            $shadowFile = $request->file('shadow_path');
            if (isset($shadowFile))
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
            if (isset($highlightFile))
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

            // Thumbnail File
            $thumbnailFile = $request->file('thumbnail_path');
            if (isset($thumbnailFile))
            {
                if ($thumbnailFile->isValid())
                {
                    // Highlight
                    $data['thumbnail_path'] = MaterialUploader::upload(
                                                    $thumbnailFile,
                                                    $materialName,
                                                    'thumbnail'
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

        $response = null;
        if (!empty($materialId))
        {
            $response = $this->client->updateMaterial($data);
        }
        else
        {
            $response = $this->client->createMaterial($data);
        }

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
}
