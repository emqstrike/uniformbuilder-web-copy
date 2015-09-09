<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\MaterialsAPIClient;
use App\APIClients\MaterialsOptionsAPIClient as APIClient;

class MaterialsOptionsController extends Controller
{
    protected $client;
    protected $materialClient;

    public function __construct(
        APIClient $apiClient,
        MaterialsAPIClient $materialClient
    )
    {
        $this->client = $apiClient;
        $this->materialClient = $materialClient;
    }

    public function store(Request $request)
    {
        $materialId = $request->input('material_id');
        $materialOptionId = $request->input('material_option_id');
        $materialObject = $this->materialClient->getMaterial($materialId);
        $materialFolder = null;
        if (!is_null($materialObject))
        {
            $materialFolder = $materialObject->slug;
        }
        $materialOptionName = $request->input('name');
        $settingType = $request->input('setting_type');
        $layerLevel = $request->input('layer_level');
        $perspective = $request->input('perspective');
        $colors = $request->input('colors');
        $gradients = $request->input('gradients');
        $is_blend = null !== $request->input('is_blend');

        $data = [
            'material_id' => $materialId,
            'name' => $materialOptionName,
            'setting_type' => $settingType,
            'layer_level' => $layerLevel,
            'perspective' => $perspective,
            'colors' => $colors,
            'gradients' => $gradients,
            'is_blend' => $is_blend,
        ];

        try
        {
            $materialOptionFile = $request->file('material_option_path');
            if (!is_null($materialOptionFile))
            {
                if ($materialOptionFile->isValid())
                {
                    $filename = Random::randomize(12);
                    $data['material_option_path'] = FileUploader::upload(
                                                                $materialOptionFile,
                                                                $materialOptionName,
                                                                'material_option',
                                                                "materials",
                                                                "{$materialFolder}/options/{$settingType}/{$filename}.png"
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
        if (!empty($materialOptionId))
        {
            Log::info('Attempts to update MaterialOption#' . $materialOptionId);
            $data['id'] = $materialOptionId;
            $response = $this->client->update($data);
        }
        else
        {
            Log::info('Attempts to create a new Material Option ' . json_encode($data));
            $response = $this->client->create($data);
        }

        if ($response->success)
        {
            //$response->message
            Log::info('Success');
            return Redirect::to('/administration/materials')
                            ->with('message', $is_blend);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/materials')
                            ->with('message', 'There was a problem saving your material option');
        }
    }
}
