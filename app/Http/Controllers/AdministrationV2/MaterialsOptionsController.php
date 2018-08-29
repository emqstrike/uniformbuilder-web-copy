<?php

namespace App\Http\Controllers\AdministrationV2;

use App\APIClients\MaterialsAPIClient;
use App\APIClients\MaterialsOptionsAPIClient as APIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

    public function updateMaterialOptions(Request $request)
    {
        $data = [];
        $optionIds = $request->input('option_id');
        $optionLayerLevels = $request->input('layer_level');
        $optionNames = $request->input('name');
        $materialID = $request->input('cleanup_material_id');
        $groupIDs = $request->input('group_id');
        $teamColorIDs = $request->input('team_color_id');
        $deafaultColors = $request->input('default_color');
        $allowPatterns = $request->input('allow_pattern');

        $ctr = 0;
        foreach ($optionIds as $optionId) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['info'][$item] = [
                'id' => $optionId,
            ];
            $ctr++;
        }

        $ctr = 0;
        foreach ($optionLayerLevels as $optionLayerLevel) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['info'][$item]['layer_level'] = $optionLayerLevel;
            $ctr++;
        }

        $ctr = 0;
        foreach ($optionNames as $optionName) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['info'][$item]['name'] = $optionName;
            $ctr++;
        }

        $ctr = 0;
        foreach ($groupIDs as $groupID) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['info'][$item]['group_id'] = $groupID;
            $ctr++;
        }

        $ctr = 0;
        foreach ($teamColorIDs as $teamColorID) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['info'][$item]['team_color_id'] = $teamColorID;
            $ctr++;
        }

        $ctr = 0;
        foreach ($deafaultColors as $color) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['info'][$item]['default_color'] = $color;
            $ctr++;
        }

        $ctr = 0;
        foreach ($allowPatterns as $allow) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['info'][$item]['allow_pattern'] = $allow;
            $ctr++;
        }

        $data['input'] = json_encode($data['info']);
        // dd($data);
        $response = null;

        $response = $this->client->updateMaterialOptions($data);

        return back()->with('message', 'Update Saved');

    }

    public function storeMultiple(Request $request)
    {
        Log::info('storeMultiple - Administration');
        $materialId = $request->input('material_id');
        $materialObjects = null;

        if (!is_null($materialId)) {
            $materialObject = $this->materialClient->getMaterial($materialId);
        }

        $materialFolder = null;
        if (!is_null($materialObject)) {
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
        
        try {
            $materialOptionFiles = $request->file('mo_image');
            $ctr = 0;

            if ($materialOptionFiles) {
                foreach ($materialOptionFiles as $materialOptionFile) {
                    $item = 'item'.$ctr;

                    if (!is_null($materialOptionFile)) {
                        if ($materialOptionFile->isValid()) {
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
        } catch (S3Exception $e) {
            $message = $e->getMessage();
            return redirect()->route('v1_materials_index')->with('message', 'There was a problem uploading your files');
        }

        $data['front'] = json_encode($data['input']);
        $data['input'] = "items";

        $response = null;
        Log::info('Attempts to create a new Material Option ' . json_encode($data));
        $response = $this->client->createMultiple($data);

        if ($response->success) {
            Log::info('Success');
            return back()->with('message', $response->message);
        } else {
            Log::info('Failed');
            return back()->with('message', 'There was a problem saving your material option');
        }
    }
}
