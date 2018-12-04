<?php

namespace App\Http\Controllers\AdministrationV2;

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

    public function index($active_sport = null)
    {
        if($active_sport == null) {
            $active_sport = "Football 2017";
        }
        $patterns = $this->client->getPatternsBySport($active_sport);

        return view('administration-lte-2.patterns.patterns', [
            'patterns' => $patterns,
            'active_sport' => $active_sport
        ]);
    }

    public function editPatternForm($id)
    {
        $colors = $this->colorsClient->getColors();
        $pattern = $this->client->getPattern($id);
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();

        return view('administration-lte-2.patterns.pattern-edit', [
            'pattern' => $pattern,
            'color' => $colors,
            'categories' => $uniformCategories
        ]);
    }

    public function addPatternForm()
    {
        $colors = $this->colorsClient->getColors();
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();

        return view('administration-lte-2.patterns.pattern-create', [
            'color' => $colors,
            'categories' => $uniformCategories
        ]);
    }

    public function store(Request $request)
    {
        $patternName = $request->input('name');
        $assetTarget = $request->input('asset_target');
        $patternProperties = $request->input('pattern_properties');
        $brand = $request->input('brand');
        $range_position = $request->input('range_position');
        $sports = explode(",", $request->input('sports_value'));
        $blockPatternOptions = explode(",", $request->input('block_pattern_options_value'));

        $data = [
            'name' => $patternName,
            'pattern_properties' => $patternProperties,
            'sports' => $sports,
            'block_pattern_options' => $blockPatternOptions,
            'asset_target' => $assetTarget,
            'brand' => $brand,
            'range_position' => $range_position
        ];

        $patternId = null;
        if (!empty($request->input('base_pattern_id')))
        {
            $patternId = $request->input('base_pattern_id');
            $data['id'] = $patternId;
        }

        try
        {
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
            return Redirect::to('/administration/v1-0/patterns')
                            ->with('message', 'There was a problem uploading your files');
        }
        $myJson = json_decode($patternProperties, true);
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
            return Redirect::to('/administration/v1-0/patterns')
                            ->with('message', 'There was a problem uploading your files');
        }

        try
        {
            $lowReslayerFiles = (array) $request->file('pattern_lowres_layer_image');
            $ctr = 1;
            foreach ($lowReslayerFiles as $lowReslayerFile) {
                if (!is_null($lowReslayerFile))
                {
                    if ($lowReslayerFile->isValid())
                    {
                        $filename = Random::randomize(12);
                        $myJson[(string)$ctr]['lowres_file_path'] = FileUploader::upload(
                                                                    $lowReslayerFile,
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
            return Redirect::to('/administration/v1-0/patterns')
                            ->with('message', 'There was a problem uploading your files');
        }

        $data['pattern_properties'] = json_encode($myJson, JSON_UNESCAPED_SLASHES);
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
            return Redirect::to('administration/v1-0/patterns')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/v1-0/patterns')
                            ->with('message', $response->message);
        }
    }
}
