<?php

namespace App\Http\Controllers\Administration;

use View;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\FileUploaderv2;
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
        $mascot_categories = $this->mascotsCategoryClient->getMascotCategories();
        
        
        return view('administration.mascots.mascots', [
            'mascots' => $mascots,
            'mascot_categories' => $mascot_categories
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
        // $tags = $request->input('code');
        $category = $request->input('category');
        // $team_color_id = $request->input('team_color_id');
        $layersProperties = $request->input('layers_properties');

        $data = [
            'name' => $mascotName,
            'code' => $code,
            'category' => $category,
            // 'team_color_id' => $team_color_id,
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
        

        $folder_name = "mascot_ai_files";

            try
        {
            $materialOptionFile = $request->file('ai_file');
            if (!is_null($materialOptionFile))
            {
                if ($materialOptionFile->isValid())
                {

                    $randstr = Random::randomize(12);
                    $data['ai_file'] = FileUploaderV2::upload(
                                                    $mascotName,
                                                    $materialOptionFile,
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

        // Upload Ai File
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
      

        $response = null;

        if (!empty($id))
        {
         // dd($data);

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
