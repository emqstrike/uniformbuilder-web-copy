<?php

namespace Customizer\Http\Controllers\Administration;

use View;
use \Redirect;
use Customizer\Http\Requests;
use Customizer\Utilities\Log;
use Illuminate\Http\Request;
use Customizer\Utilities\FileUploader;
use Customizer\Utilities\FileUploaderV2;
use Customizer\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use Customizer\Http\Controllers\Controller;
use Customizer\APIClients\ColorsAPIClient;
use Customizer\APIClients\MascotsCategoriesAPIClient;
use Customizer\APIClients\ArtworksAPIClient;
use Customizer\APIClients\MascotsAPIClient as APIClient;

class MascotsController extends Controller
{
    protected $client;
    protected $colorsClient;
    protected $artworksClient;

    public function __construct(
        APIClient $apiClient,
        ColorsAPIClient $colorsAPIClient,
        MascotsCategoriesAPIClient $mascotsCategoryAPIClient,
        ArtworksAPIClient $artworksAPIClient
    )
    {
        $this->client = $apiClient;
        $this->colorsClient = $colorsAPIClient;
        $this->mascotsCategoryClient = $mascotsCategoryAPIClient;
        $this->artworksClient = $artworksAPIClient;
    }

    public function index()
    {

        $mascots = $this->client->getMascots();
        $mascot_categories = $this->mascotsCategoryClient->getMascotCategories();
        $categoriesAPIClient = new \Customizer\APIClients\UniformCategoriesAPIClient();
        $sports = $categoriesAPIClient->getUniformCategories();
        
        return view('administration.mascots.mascots', [
            'mascots' => $mascots,
            'mascot_categories' => $mascot_categories,
            'sports' => $sports
        ]);
    }

    public function indexFiltered(Request $request)
    {
// dd($request->category);
        // $category = $request->category;
        // $mascots = $this->client->getMascotByCategory($category);
        $mascot_categories = $this->mascotsCategoryClient->getMascotCategories();

        // return response()->json(['mascots' => $mascots->mascots]);
// dd($mascots);

        // $html = View::make('administration.mascots.mascots-table', [
        //     'mascots' => $mascots->mascots,
        //     'mascot_categories' => $mascot_categories
        // ]);
        $html = View::make('administration.mascots.mascots-table',
            array(
                    'mascots' => $mascots->mascots,
                    'mascot_categories' => $mascot_categories
            ))->render();
        // dd($html);
        return response()->json(['html' => $html, 'success' => true]);

        // return view('administration.mascots.mascots', [
        //     'mascots' => $mascots->mascots,
        //     'mascot_categories' => $mascot_categories
        // ]);
    }

    public function addMascotForm()
    {
        $colors = $this->colorsClient->getColors();
        $raw_mascots_categories = $this->mascotsCategoryClient->getMascotCategories();
        $mascots_categories = array();
        $categoriesAPIClient = new \Customizer\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();

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
            'mascots_categories' => $mascots_categories,
            'categories' => $uniformCategories
        ]);
    }

    public function addArtworkForm($artwork_request_id, $artwork_index)
    {
        $colors = $this->colorsClient->getColors();
        $raw_mascots_categories = $this->mascotsCategoryClient->getMascotCategories();
        $mascots_categories = array();
        $artwork_request = $this->artworksClient->getArtwork($artwork_request_id);
        $team_colors = $this->artworksClient->getOrderTeamColors($artwork_request->order_code);
// dd($team_colors);
        foreach($raw_mascots_categories as $mascot_category){
            if($mascot_category->active == 1){
                $mascots_categories[] = $mascot_category->name;
            }
        }

        $mascots_categories = array_sort($mascots_categories, function($value) {
            return sprintf('%s,%s', $value[0], $value[1]);
        });

        return view('administration.mascots.upload-artwork', [

            'colors' => $colors,
            'mascots_categories' => $mascots_categories,
            'artwork_request_id' => $artwork_request_id,
            'artwork_index' => $artwork_index,
            'team_colors' => $team_colors

        ]);

    }

    public function editMascotForm($id)
    {
        $colors = $this->colorsClient->getColors();
        $mascot = $this->client->getMascot($id);
        $categoriesAPIClient = new \Customizer\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();

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
            'mascots_categories' => $mascots_categories,
            'categories' => $uniformCategories
        ]);
    }

    public function store(Request $request)
    {
        $mascotName = $request->input('name');
        $code = $request->input('code');
        // $tags = $request->input('code');
        $category = $request->input('category');
        // $team_color_id = $request->input('team_color_id');
        $layersProperties = $request->input('layers_properties');


        $sports = explode(",", $request->input('sports_value'));
        $data = [
            'name' => $mascotName,
            'code' => $code,
            'category' => $category,
            // 'team_color_id' => $team_color_id,
            'layers_properties' => $layersProperties,
            'sports' => $sports
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
                    // $randstr = Random::randomize(12);
                    // $data['ai_file'] = FileUploaderV2::upload(
                    //                                 $newFile,
                    //                                 $randstr,
                    //                                 'file',
                    //                                 $folder_name
                    //                             );
                }
            }
        }
        catch (S3Exception $e)
        {

            $message = $e->getMessage();
            return Redirect::to('/administration/mascots')
                            ->with('message', 'There was a problem uploading your files');
        }

        try
        {
            $mascotLayerFiles = $request->file('ma_image');
            $ctr = count($mascotLayerFiles);
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
                $ctr--;
            }
        }

        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/mascots')
                            ->with('message', 'There was a problem uploading your files');
        }


        $data['layers_properties'] = json_encode($myJson, JSON_UNESCAPED_SLASHES);
      

             // Upload Ai File

        $folder_name = "mascot_ai_files";

        try
        {
            $newFile = $request->file('ai_file');
            if (!is_null($newFile))
            {
                if ($newFile->isValid())
                {

                    $randstr = Random::randomize(12);
                    $data['ai_file'] = FileUploaderV2::upload(
                                                    $newFile,
                                                    $randstr,
                                                    'file',
                                                    $folder_name
                                                );
                }
            }
        }
        catch (S3Exception $e)
        {

            $message = $e->getMessage();
            return Redirect::to('/administration/mascots')
                            ->with('message', 'There was a problem uploading your files');
        }

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

    public function storeArtwork(Request $request)
    {
        $mascotName = $request->input('name');
        $code = $request->input('code');
        $category = $request->input('category');
        $layersProperties = $request->input('layers_properties');

        $artworkRequestID = $request->input('artwork_request_id');
        $artworkIndex = $request->input('artwork_index');
        $artwork_request = $this->artworksClient->getArtwork($artworkRequestID);
        $ar_json = json_decode($artwork_request->artworks, 1);
        $team_colors = array();

        /* Build colors, save to artwork json */
        $lpx = json_decode($layersProperties, 1);
        foreach($lpx as $layer)
        {
            array_push($team_colors, $layer);
        }

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
                    // update artwork data
                    array_push($ar_json[$artworkIndex]['history'], $ar_json[$artworkIndex]['file']);
                    $ar_json[$artworkIndex]['updated'] = 1;
                    $ar_json[$artworkIndex]['file'] = $data['icon'];
                    $ar_json[$artworkIndex]['colors'] = $team_colors;
                }
            }
        }
        catch (S3Exception $e)
        {

            $message = $e->getMessage();
            return Redirect::to('/administration/mascots')
                            ->with('message', 'There was a problem uploading your files');
        }

        try
        {
            $mascotLayerFiles = $request->file('ma_image');
            $ctr = count($mascotLayerFiles);
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
                $ctr--;
            }
        }

        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/mascots')
                            ->with('message', 'There was a problem uploading your files');
        }


        $data['layers_properties'] = json_encode($myJson, JSON_UNESCAPED_SLASHES);
        $folder_name = "mascot_ai_files";

        try // Upload Ai File
        {
            $newFile = $request->file('ai_file');
            if (!is_null($newFile))
            {
                if ($newFile->isValid())
                {

                    $randstr = Random::randomize(12);
                    $data['ai_file'] = FileUploaderV2::upload(
                                                    $newFile,
                                                    $randstr,
                                                    'file',
                                                    $folder_name
                                                );
                }
            }
        }
        catch (S3Exception $e)
        {

            $message = $e->getMessage();
            return Redirect::to('/administration/mascots')
                            ->with('message', 'There was a problem uploading your files');
        }

        $response = null;

        if (!empty($id))
        {
            Log::info('Attempts to update Mascot#' . $id);
        }
        else
        {
            Log::info('Attempts to create a new Mascot ' . json_encode($data));

            $response = $this->client->createArtwork($data);
            $ar_json[$artworkIndex]['mascot_id'] = $response->art_id;

            $artwork_request->artworks = $ar_json;

            $this->artworksClient->updateArtwork($artwork_request);
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
