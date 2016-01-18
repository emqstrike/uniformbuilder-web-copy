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
        $sublimatedDefaultColor = $request->input('sublimated_default_color');
        $perspective = $request->input('perspective');
        $colors = $request->input('colors');
        $sublimated_colors = $request->input('sublimated_colors');
        $gradients = $request->input('gradients');
        $is_blend = is_null($request->input('is_blend')) ? 0 : 1;
        $boundary_properties = $request->input('boundary_properties');
        $applications_properties = $request->input('applications_properties');

        $data = [
            'material_id' => $materialId,
            'name' => $materialOptionName,
            'setting_type' => $settingType,
            'origin' => $origin,
            'layer_level' => $layerLevel,
            'default_color' => $defaultColor,
            'sublimated_default_color' => $sublimatedDefaultColor,
            'perspective' => $perspective,
            'colors' => $colors,
            'sublimated_colors' => $sublimated_colors,
            'gradients' => $gradients,
            'is_blend' => $is_blend,
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
// dd(json_encode($data));
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
        // dd($layerLevels);
        $settingTypes = $request->input('setting_type');
        // $perspective = $request->input('perspective');
        $perspective = "front";
        $defaultColors = $request->input('default_color');

        $colors = $request->input('colors');
        $gradients = $request->input('gradients');

        $is_blend = is_null($request->input('is_blend')) ? 0 : 1;
        $boundary_properties = $request->input('boundary_properties');
        $applications_properties = $request->input('applications_properties');

        $data = [];
        $ctr = 0;
        $idx = '';
        foreach ($materialOptionNames as $materialOptionName) {
            // $idx = (string)$ctr;
            // $idx = strval($ctr);
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['input'][$item] = [
                'material_id' => $materialId,
                'name' => $materialOptionNames[$ctr],
                'setting_type' => $settingTypes[$ctr],
                'origin' => $origin,
                'layer_level' => $layerLevels[$ctr],
                'default_color' => $defaultColors[$ctr],
                'sublimated_default_color' => $defaultColors[$ctr],
                'perspective' => $perspective,
                'colors' => $colors,
                'sublimated_colors' => $colors,
                'gradients' => $gradients,
                'is_blend' => $is_blend,
                'boundary_properties' => $boundary_properties,
                'applications_properties' => $applications_properties,
                'material_option_path' => ''
            ];
            // $data['front'][$item] = json_encode($data['front'][$item]);
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
                        // $data[$ctr]['material_option_path'] = FileUploader::upload(
                        $data['input'][$item]['material_option_path'] = FileUploader::upload(
                                                                    $materialOptionFile,
                                                                    $materialOptionNames[$ctr],
                                                                    'material_option',
                                                                    "materials",
                                                                    "{$materialFolder}/options/{$settingTypes[$ctr]}/{$filename}.png"
                                                                );
                    }
                }
                // $data['front'][$item] = json_encode(array_map('utf8_encode', $data));//json_encode($data['front'][$item]);
                $ctr++;
            }
            // $data['front'][$item] = json_encode($data['front'][$item]);
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/materials')
                            ->with('message', 'There was a problem uploading your files');
        }

$data['front'] = json_encode($data['input']);
// $data['back'] = json_encode($data['input']);
$data['input'] = "items";
dd($data);
$layerA = json_decode($data['front']);
// $layerB = $layerA['item0']->$material_id;
$layerB = $layerA->item0;
// $layerC = json_decode($layerB['name']);
// dd($layerB);

        $response = null;

        // $data = json_encode($data, JSON_UNESCAPED_SLASHES);
        //** $data = json_encode($data['front']);

        //** dd($data);
        // Log::info('Attempts to create a new Material Option ' . json_encode($data));
        Log::info('Attempts to create a new Material Option ' . json_encode($data));
        $response = $this->client->createMultiple($data);

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
