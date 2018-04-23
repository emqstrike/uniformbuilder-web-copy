<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use \Session;
use App\Http\Requests;
use App\Utilities\Log;
use App\Utilities\Random;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\ColorsAPIClient;
use App\APIClients\PatternsAPIClient as APIClient;

class PatternsController extends Controller
{
    protected $client;
    protected $colorsClient;

    public function __construct(
        APIClient $apiClient,
        ColorsAPIClient $colorsAPIClient
    )
    {
        $this->client = $apiClient;
        $this->colorsClient = $colorsAPIClient;
    }

    public function index()
    {
        $patterns = $this->client->getPatterns();

        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);
        if (in_array($user_id, $su_array)) {
            return view('administration.patterns.patterns', [
                'patterns' => $patterns
            ]);
        }
        else {
                 return redirect('administration');
        }
    }

    public function editPatternForm($id)
    {
        $colors = $this->colorsClient->getColors();
        $pattern = $this->client->getPattern($id);
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();

        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);

        if (in_array($user_id, $su_array)) {
            return view('administration.patterns.pattern-edit', [
            'pattern' => $pattern,
            'color' => $colors,
            'categories' => $uniformCategories
        ]);
        }
        else {
            return redirect('administration');
        }
    }

    public function addPatternForm()
    {
        $colors = $this->colorsClient->getColors();
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();

        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);

        if (in_array($user_id, $su_array)) {
            return view('administration.patterns.pattern-create', [
            'color' => $colors,
            'categories' => $uniformCategories
        ]);
        }
        else {
            return redirect('administration');
        }
    }

    public function store(Request $request)
    {
        $patternName = $request->input('name');
        $assetTarget = $request->input('asset_target');
        $patternProperties = $request->input('pattern_properties');
        $brand = $request->input('brand');
        $sports = explode(",", $request->input('sports_value'));
        $blockPatternOptions = explode(",", $request->input('block_pattern_options_value'));
        // $team_color_id = $request->input('team_color_id');
        // $layer_1_color = $request->input('layer_1_color');
        // $layer_2_color = $request->input('layer_2_color');
        // $layer_3_color = $request->input('layer_3_color');
        // $layer_4_color = $request->input('layer_4_color');

        $data = [
            'name' => $patternName,
            'pattern_properties' => $patternProperties,
            'sports' => $sports,
            'block_pattern_options' => $blockPatternOptions,
            'asset_target' => $assetTarget,
            'brand' => $brand
            // 'layer_1_default_color' => $layer_1_color,
            // 'layer_2_default_color' => $layer_2_color,
            // 'layer_3_default_color' => $layer_3_color,
            // 'layer_4_default_color' => $layer_4_color,
            // 'team_color_id' => $team_color_id
        ];
// dd($data);
        $patternId = null;
        if (!empty($request->input('base_pattern_id')))
        {
            $patternId = $request->input('base_pattern_id');
            $data['id'] = $patternId;
        }

        // Does the Pattern Name exist
        // if ($this->client->isPatternExist($patternName, $patternId))
        // {
        //     return Redirect::to('administration/patterns')
        //                     ->with('message', 'Pattern name already exist');
        // }

        try
        {
            // for ($i = 1; $i <= 4; $i++)
            // {
            //     $fieldName = "layer_{$i}_path";
            //     $filename = "layer{$i}.png";
            //     $patternFile = $request->file($fieldName);
            //     if (isset($patternFile))
            //     {
            //         if ($patternFile->isValid())
            //         {
            //             $data[$fieldName] = FileUploader::upload(
            //                 $patternFile,
            //                 $patternName,
            //                 'pattern_layer',    // Type
            //                 'patterns',         // S3 Folder
            //                 $filename     // Layer File Name
            //             );

            //         }
            //     }
            // }
            $thumbnailFile = $request->file('thumbnail_path');
            if (isset($thumbnailFile))
            {
                if ($thumbnailFile->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['thumbnail_path'] = FileUploader::upload(
                        $thumbnailFile,
                        $patternName.$randstr,
                        'pattern_thumbnail',
                        'patterns'
                    );
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/patterns')
                            ->with('message', 'There was a problem uploading your files');
        }
        $myJson = json_decode($patternProperties, true);
        // Upload Neck Options Thumbnails
        try
        {
            $layerFiles = (array) $request->file('pattern_layer_image');
            $ctr = 1;
            foreach ($layerFiles as $layerFile) {
                if (!is_null($layerFile))
                {
                    if ($layerFile->isValid())
                    {
                        $filename = Random::randomize(12);
                        // $filename = $myJson[(string)$ctr]['name'];
                        // $filename = str_replace(' ', '', $filename);
                        $myJson[(string)$ctr]['file_path'] = FileUploader::upload(
                                                                    $layerFile,
                                                                    $patternName,
                                                                    'material_option',
                                                                    "materials",
                                                                    "{$patternName}/{$filename}.png"
                                                                );
                    }
                }
                $ctr++;
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/block_patterns')
                            ->with('message', 'There was a problem uploading your files');
        }
        $data['pattern_properties'] = json_encode($myJson, JSON_UNESCAPED_SLASHES);
        // $data['pattern_properties'] =  str_replace(" ", "-", $data['pattern_properties']);
// dd($data);

        $response = null;
        if (!empty($patternId))
        {
            Log::info('Attempts to update Pattern#' . $patternId);

            $response = $this->client->updatePattern($data);
        }
        else
        {
            Log::info('Attempts to create a new Pattern ' . json_encode($data));
            $response = $this->client->createPattern($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/patterns')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/patterns')
                            ->with('message', $response->message);
        }
    }
}
