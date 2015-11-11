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
        $materialObject = null;
        
        if (!is_null($materialId))
        {
            $materialObject = $this->materialClient->getMaterial($materialId);
        }

        $materialFolder = null;
        if (!is_null($materialObject))
        {
            $materialFolder = $materialObject->slug;
        }

        $materialOptionName = $request->input('name');
        $settingType = $request->input('setting_type');
        $origin = $request->input('origin');
        $layerLevel = $request->input('layer_level');
        $defaultColor = $request->input('default_color');
        $perspective = $request->input('perspective');
        $colors = $request->input('colors');
        $gradients = $request->input('gradients');
        $is_blend = is_null($request->input('is_blend')) ? 0 : 1;
        $boundary_properties = $request->input('boundary_properties');
        $front_application_properties = $request->input('front_application_properties');
        $back_application_properties = $request->input('back_application_properties');
        $left_application_properties = $request->input('left_application_properties');
        $right_application_properties = $request->input('right_application_properties');

        $data = [
            'material_id' => $materialId,
            'name' => $materialOptionName,
            'setting_type' => $settingType,
            'origin' => $origin,
            'layer_level' => $layerLevel,
            'default_color' => $defaultColor,
            'perspective' => $perspective,
            'colors' => $colors,
            'gradients' => $gradients,
            'is_blend' => $is_blend,
            'boundary_properties' => $boundary_properties,
            'front_application_properties' => $front_application_properties,
            'back_application_properties' => $back_application_properties,
            'left_application_properties' => $left_application_properties,
            'right_application_properties' => $right_application_properties
        ];

        try
        {
            $materialOptionFile = $request->file('material_option_path');
            $frontShapeFile = $request->file('material_option_front_shape_path');
            $backShapeFile = $request->file('material_option_back_shape_path');
            $leftShapeFile = $request->file('material_option_left_shape_path');
            $rightShapeFile = $request->file('material_option_right_shape_path');
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
                // if ($frontShapeFile->isValid())
                //     $filename = Random::randomize(12);
                //     $data['front_shape_path'] = FileUploader::upload(
                //                                                 $frontShapeFile,
                //                                                 $materialOptionName,
                //                                                 'material_option',
                //                                                 "materials",
                //                                                 "{$materialFolder}/options/{$settingType}/{$filename}.png"
                //                                             );
                // }
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
            Log::info('Success');
            return Redirect::to('/administration/materials')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/materials')
                            ->with('message', 'There was a problem saving your material option');
        }
    }
}
