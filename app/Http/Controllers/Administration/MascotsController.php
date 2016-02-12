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
use App\APIClients\ColorsAPIClient;
use App\APIClients\MascotsCategoriesAPIClient;
use App\APIClients\MascotsAPIClient as APIClient;

class MascotsController extends Controller
{
    protected $client;
    protected $colorsClient;

    public function __construct(
        APIClient $apiClient,
        ColorsAPIClient $colorsAPIClient,
        MascotsCategoriesAPIClient $mascotsCategoryAPIClient
    )
    {
        $this->client = $apiClient;
        $this->colorsClient = $colorsAPIClient;
        $this->mascotsCategoryClient = $mascotsCategoryAPIClient;
    }

    public function index()
    {
        $mascots = $this->client->getMascots();

        return view('administration.mascots.mascots', [
            'mascots' => $mascots
        ]);
    }

    public function addMascotForm()
    {
        $colors = $this->colorsClient->getColors();
        $raw_mascots_categories = $this->mascotsCategoryClient->getMascotCategories();
        $mascots_categories = array();

        foreach($raw_mascots_categories as $mascot_category){
            if($mascot_category->active == 1){
                $mascots_categories[] = $mascot_category->name;
            }
        }

        $mascots_categories = array_sort($mascots_categories, function($value) {
            return sprintf('%s,%s', $value[0], $value[1]);
        });

        return view('administration.mascots.mascot-create', [
            'colors' => $colors,
            'mascots_categories' => $mascots_categories
        ]);
    }

    public function editMascotForm($id)
    {
        $colors = $this->colorsClient->getColors();
        $mascot = $this->client->getMascot($id);

        $raw_mascots_categories = $this->mascotsCategoryClient->getMascotCategories();
        $mascots_categories = array();

        foreach($raw_mascots_categories as $mascot_category){
            if($mascot_category->active == 1){
                $mascots_categories[] = $mascot_category->name;
            }
        }

        $mascots_categories = array_sort($mascots_categories, function($value) {
            return sprintf('%s,%s', $value[0], $value[1]);
        });

        return view('administration.mascots.mascot-edit', [
            'colors' => $colors,
            'mascot' => $mascot,
            'mascots_categories' => $mascots_categories
        ]);
    }

    public function store(Request $request)
    {
        $mascotName = $request->input('name');
        $code = $request->input('code');
        $category = $request->input('category');
        $layersProperties = $request->input('layers_properties');

        $data = [
            'name' => $mascotName,
            'code' => $code,
            'category' => $category,
            'layers_properties' => $layersProperties
        ];

        $id = null;
        if (!empty($request->input('mascot_id')))
        {
            $id = $request->input('mascot_id');
            $data['id'] = $id;
        }

        $myJson = json_decode($layersProperties, true);

        $materialFolder = $mascotName;
        try
        {
            $materialOptionFile = $request->file('icon');
            if (!is_null($materialOptionFile))
            {
                if ($materialOptionFile->isValid())
                {
                    $filename = Random::randomize(12);
                    $data['icon'] = FileUploader::upload(
                                                            $materialOptionFile,
                                                            $mascotName,
                                                            'material_option',
                                                            "materials",
                                                            "{$materialFolder}/{$filename}.png"
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

        // Upload images from the layers
        try
        {
            $mascotLayerFiles = $request->file('ma_image');
            $ctr = 1;
            foreach ($mascotLayerFiles as $mascotLayerFile) {
                if (!is_null($mascotLayerFile))
                {
                    if ($mascotLayerFile->isValid())
                    {
                        $filename = Random::randomize(12);
                        $myJson[(string)$ctr]['filename'] = FileUploader::upload(
                                                                    $mascotLayerFile,
                                                                    $mascotName,
                                                                    'material_option',
                                                                    "materials",
                                                                    "{$materialFolder}/{$filename}.png"
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
        $data['layers_properties'] = json_encode($myJson, JSON_UNESCAPED_SLASHES);
//dd($data);
        $response = null;
        if (!empty($id))
        {
            Log::info('Attempts to update Mascot#' . $id);
            $response = $this->client->updateMascot($data);
        }
        else
        {
            Log::info('Attempts to create a new Mascot ' . json_encode($data));
            $response = $this->client->createMascot($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/mascots')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/mascots')
                            ->with('message', $response->message);
        }
    }
}
