<?php

namespace App\Http\Controllers\AdministrationV2;

use App\APIClients\ArtworksAPIClient;
use App\APIClients\LogoRequestsAPIClient;
use App\APIClients\ColorsAPIClient;
use App\APIClients\CustomArtworkRequestAPIClient;
use App\APIClients\MascotsAPIClient as APIClient;
use App\APIClients\MascotsCategoriesAPIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Utilities\FileUploader;
use App\Utilities\FileUploaderV2;
use App\Utilities\Log;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use Illuminate\Http\Request;
use View;
use \Redirect;
use Session;

class MascotsController extends Controller
{
    protected $client;
    protected $colorsClient;
    protected $artworksClient;

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

    public function index($active_sport = null, $active_category = null)
    {
        if($active_sport == null) {
            $active_sport = "All";
        }
        if($active_category == null) {
            $active_category = "Balls";
        }
        $mascots = $this->client->getFilteredMascots($active_sport, $active_category);
        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);
        if (in_array($user_id, $su_array)) {
            return view('administration-lte-2.mascots.mascots', [
                'mascots' => $mascots,
                'active_sport' => $active_sport,
                'active_category' => $active_category
                ]);
        }
        else {
                return redirect('administration');
        }
    }

    public function addMascotForm()
    {
        $colors = $this->colorsClient->getColors();
        $raw_mascots_categories = $this->mascotsCategoryClient->getMascotCategories();
        $mascots_categories = array();
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();

        foreach($raw_mascots_categories as $mascot_category){
            if($mascot_category->active == 1){
                $mascots_categories[] = $mascot_category->name;
            }
        }

        $mascots_categories = array_sort($mascots_categories, function($value) {
            return sprintf('%s,%s', $value[0], $value[1]);
        });

        return view('administration-lte-2.mascots.mascot-create', [
            'colors' => $colors,
            'mascots_categories' => $mascots_categories,
            'categories' => $uniformCategories
        ]);
    }

    public function editMascotForm($id)
    {
        $colors = $this->colorsClient->getColors();
        $mascot = $this->client->getMascot($id);
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
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

        return view('administration-lte-2.mascots.mascot-edit', [
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
        $category = $request->input('category');
        $layersProperties = $request->input('layers_properties');
        $brand = $request->input('brand');

        $sports = explode(",", $request->input('sports_value'));
        $data = [
            'name' => $mascotName,
            'code' => $code,
            'category' => $category,
            'layers_properties' => $layersProperties,
            'sports' => $sports,
            'brand' => $brand
        ];

        $id = null;
        if (!empty($request->input('mascot_id')))
        {
            $id = $request->input('mascot_id');
            $data['id'] = $id;
        }

        $myJson = json_decode($layersProperties, true);
        try
        {
            $folder_name = "mascots_icon";
            $mascot_icon_file = $request->file('icon');
            if (!is_null($mascot_icon_file))
            {
                if ($mascot_icon_file->isValid())
                {
                    $filename = Random::randomize(12);
                    $data['icon'] = FileUploaderV2::upload($mascot_icon_file, $filename, 'file', $folder_name);
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/v1-0/mascots')
                            ->with('message', 'There was a problem uploading your files');
        }

        try
        {
            $folder_name = "mascots_layers";
            $mascotLayerFiles = $request->file('ma_image');
            $ctr = count((array) $mascotLayerFiles);
            if (is_array($mascotLayerFiles) || is_object($mascotLayerFiles)) {
                foreach ($mascotLayerFiles as $mascotLayerFile) {
                    if (!is_null($mascotLayerFile))
                    {
                        if ($mascotLayerFile->isValid())
                        {
                            $filename = Random::randomize(12);
                            $myJson[(string)$ctr]['filename'] = FileUploaderV2::upload($mascotLayerFile, $filename, 'file', $folder_name);
                        }
                    }
                    $ctr--;
                }
            }
        }

        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/v1-0/mascots')
                            ->with('message', 'There was a problem uploading your files');
        }

        $data['layers_properties'] = json_encode($myJson, JSON_UNESCAPED_SLASHES);

        $folder_name = "mascot_ai_files";
        try
        {
            $newFile = $request->file('ai_file');
            if (!is_null($newFile))
            {
                if ($newFile->isValid())
                {

                    $randstr = Random::randomize(12);
                    $data['ai_file'] = FileUploaderV2::upload($newFile, $randstr, 'file', $folder_name);
                }
            }
        }
        catch (S3Exception $e)
        {

            $message = $e->getMessage();
            return Redirect::to('/administration/v1-0/mascots')
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
            return Redirect::to('administration/v1-0/mascots')
                            ->with('message', 'Successfully added Mascot');
        } else {
            Log::info('Failed');
            return Redirect::to('administration/v1-0/mascots')
                            ->with('message', $response->message);
        }
    }
}
