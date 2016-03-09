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
        $teamColorId = $request->input('team_color_id');
        $groupId = $request->input('group_id');
        $defaultColor = $request->input('default_color');
        $sublimatedDefaultColor = $request->input('sublimated_default_color');
        $perspective = $request->input('perspective');
        $colors = $request->input('colors');
        $sublimated_colors = $request->input('sublimated_colors');
        $gradients = $request->input('gradients');
        $is_blend = is_null($request->input('is_blend')) ? 0 : 1;
        $allow_pattern = is_null($request->input('allow_pattern')) ? 0 : 1;
        $allow_gradient = is_null($request->input('allow_gradient')) ? 0 : 1;
        $allow_color = is_null($request->input('allow_color')) ? 0 : 1;
        $boundary_properties = $request->input('boundary_properties');
        $applications_properties = $request->input('applications_properties');

        $data = [
            'material_id' => $materialId,
            'name' => $materialOptionName,
            'setting_type' => $settingType,
            'origin' => $origin,
            'layer_level' => $layerLevel,
            'team_color_id' => $teamColorId,
            'group_id' => $groupId,
            'default_color' => $defaultColor,
            'sublimated_default_color' => $sublimatedDefaultColor,
            'perspective' => $perspective,
            'colors' => $colors,
            'sublimated_colors' => $sublimated_colors,
            'gradients' => $gradients,
            'is_blend' => $is_blend,
            'allow_pattern' => $allow_pattern,
            'allow_gradient' => $allow_gradient,
            'allow_color' => $allow_color,
            'boundary_properties' => $boundary_properties,
            'applications_properties' => $applications_properties
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
// dd($data);
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
            return Redirect::to('/administration/material/view_material_options/'.$data['material_id'])
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/materials')
                            ->with('message', 'There was a problem saving your material option');
        }
    }

    public function storeMultiple(Request $request)
    {
        Log::info('storeMultiple - Administration');
        $materialId = $request->input('material_id');
        $materialObjects = null;

        if (!is_null($materialId))
        {
            $materialObject = $this->materialClient->getMaterial($materialId);
        }

        $materialFolder = null;
        if (!is_null($materialObject))
        {
            $materialFolder = $materialObject->slug;
        }

        $origin = $request->input('origin');
        $materialOptionNames = $request->input('mo_name');
        $layerLevels = $request->input('mo_layer');
        $settingTypes = $request->input('mo_setting_type');
        $teamColorId = $request->input('mo_team_color_id');
        $groupId = $request->input('mo_group_id');
        $defaultColor = $request->input('mo_default_color');
        $sublimatedDefaultColor = $request->input('mo_sublimated_default_color');
        $perspective = $request->input('perspective');
        $colors = $request->input('colors');
        $sublimated_colors = $request->input('sublimated_colors');
        $gradients = $request->input('gradients');
        $is_blend = $request->input('is_blend_array');

        $allow_pattern = $request->input('allow_pattern_array');
        $allow_gradient = $request->input('allow_gradient_array');
        $allow_color = $request->input('allow_color_array');

        $boundary_properties = $request->input('boundary_properties');
        $applications_properties = $request->input('applications_properties');
        $is_blend_array = explode(",", $is_blend);
        $allow_pattern_array = explode(",", $allow_pattern);
        $allow_gradient_array = explode(",", $allow_gradient);
        $allow_color_array = explode(",", $allow_color);

        $data = [];
        $ctr = 0;
        $idx = '';
        foreach ($materialOptionNames as $materialOptionName) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['input'][$item] = [
                'material_id' => $materialId,
                'name' => $materialOptionNames[$ctr],
                'setting_type' => $settingTypes[$ctr],
                'origin' => $origin,
                'layer_level' => $layerLevels[$ctr],
                'team_color_id' => $teamColorId[$ctr],
                'group_id' => $groupId[$ctr],
                'default_color' => $defaultColor[$ctr],
                'sublimated_default_color' => $sublimatedDefaultColor[$ctr],
                'perspective' => $perspective,
                'colors' => json_encode($colors),
                'sublimated_colors' => json_encode($sublimated_colors),
                'gradients' => json_encode($gradients),
                'is_blend' => $is_blend_array[$ctr],
                'allow_pattern' => $allow_pattern_array[$ctr],
                'allow_gradient' => $allow_gradient_array[$ctr],
                'allow_color' => $allow_color_array[$ctr],
                'boundary_properties' => $boundary_properties,
                'applications_properties' => $applications_properties,
                'material_option_path' => ''
            ];
            $ctr++;
        }
        try
        {
            $materialOptionFiles = $request->file('mo_image');
            $ctr = 0;
            foreach ($materialOptionFiles as $materialOptionFile) {
                $item = 'item'.$ctr;
                if (!is_null($materialOptionFile))
                {
                    if ($materialOptionFile->isValid())
                    {
                        $filename = Random::randomize(12);
                        $data['input'][$item]['material_option_path'] = FileUploader::upload(
                                                                    $materialOptionFile,
                                                                    $materialOptionNames[$ctr],
                                                                    'material_option',
                                                                    "materials",
                                                                    "{$materialFolder}/options/{$settingTypes[$ctr]}/{$filename}.png"
                                                                );
                    }
                }
                $ctr++;
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/materials')
                            ->with('message', 'There was a problem uploading your files');
        }

        $data['front'] = json_encode($data['input']);
        $data['input'] = "items";

        $response = null;
        Log::info('Attempts to create a new Material Option ' . json_encode($data));
        $response = $this->client->createMultiple($data);

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('/administration/material/view_material_options/'.$materialId)
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/material/view_material_options/'.$materialId)
                            ->with('message', 'There was a problem saving your material option');
        }
    }

    public function purgeColor(Request $request)
    {
        $mo_material_id = $request->input('cleanup_material_id');
        $data = [
            'id' => $mo_material_id
        ];

        Log::info('Attempts to cleanup properties' . json_encode($data));
        $response = $this->client->purge($data);

        return Redirect::to('/administration/material/view_material_options/'.$mo_material_id);
    }
}