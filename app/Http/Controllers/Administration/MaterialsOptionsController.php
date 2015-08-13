<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\MaterialsOptionsAPIClient as APIClient;

class MaterialsOptionsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function store(Request $request)
    {
        $materialId = $request->input('material_id');
        $materialOptionName = $request->input('name');
        $settingType = $request->input('setting_type');
        $settingCode = $request->input('setting_code');
        $layerLevel = $request->input('layer_level');

        $data = [
            'material_id' => $materialId,
            'name' => $materialOptionName,
            'setting_type' => $settingType,
            'setting_code' => $settingCode,
            'layer_level' => $layerLevel
        ];

        try
        {
            $materialOptionFile = $request->file('material_option_path');
            if (!is_null($materialOptionFile))
            {
                if ($materialOptionFile->isValid())
                {
                    $data['material_path'] = FileUploader::upload(
                                                $materialOptionFile,
                                                $materialOptionName,
                                                'material_option',
                                                "materials/{$settingType}/{$settingCode}"
                                            );
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/materials')
                            ->with('message', 'There was a problem uploading your files');
        }

        $response = null;
        if (!empty($materialId))
        {
            $response = $this->client->update($data);
        }
        else
        {
            $response = $this->client->create($data);
        }

        if ($response->success)
        {
            return Redirect::to('/administration/materials')
                            ->with('message', $response->message);
        }
        else
        {
            return Redirect::to('/administration/materials')
                            ->with('message', 'There was a problem saving your material');
        }
    }
}
