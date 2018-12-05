<?php

namespace App\Http\Controllers\Administration;

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

class MascotsController extends Controller
{
    protected $client;
    protected $colorsClient;
    protected $artworksClient;
    protected $logoRequestsClient;

    public function __construct(
        APIClient $apiClient,
        ColorsAPIClient $colorsAPIClient,
        MascotsCategoriesAPIClient $mascotsCategoryAPIClient,
        ArtworksAPIClient $artworksAPIClient,
        LogoRequestsAPIClient $logoRequestsClient
    )
    {
        $this->client = $apiClient;
        $this->colorsClient = $colorsAPIClient;
        $this->mascotsCategoryClient = $mascotsCategoryAPIClient;
        $this->artworksClient = $artworksAPIClient;
        $this->logoRequestsClient = $logoRequestsClient;
    }

    public function index()
    {
        $mascots = $this->client->getMascots();
        $mascot_categories = $this->mascotsCategoryClient->getMascotCategories();
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $sports = $categoriesAPIClient->getUniformCategories();

        return view('administration.mascots.mascots', [
            'mascots' => $mascots,
            'mascot_categories' => $mascot_categories,
            'sports' => $sports
        ]);
    }

    public function searchPage()
    {

        $mascots = $this->client->getMascots();

        return view('administration.mascots.mascots-search', [
            'mascots' => $mascots
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

        return view('administration.mascots.mascot-create', [
            'colors' => $colors,
            'mascots_categories' => $mascots_categories,
            'categories' => $uniformCategories
        ]);
    }

    public function addArtworkForm($artwork_request_id, $artwork_index, $artwork_user_id)
    {
        $colors = $this->colorsClient->getColors();
        $raw_mascots_categories = $this->mascotsCategoryClient->getMascotCategories();
        $mascots_categories = array();
        $artwork_request = $this->artworksClient->getArtwork($artwork_request_id);
        $team_colors = $this->artworksClient->getOrderTeamColors($artwork_request->order_code);

        foreach($raw_mascots_categories as $mascot_category){
            if($mascot_category->active == 1){
                $mascots_categories[] = $mascot_category->name;
            }
        }

        $ordersAPIClient = new \App\APIClients\OrdersAPIClient();
        $order = $ordersAPIClient->getOrderByOrderId($artwork_request->order_code);
        $artwork_request_user_id = $order->user_id;

        $mascots_categories = array_sort($mascots_categories, function($value) {
            return sprintf('%s,%s', $value[0], $value[1]);
        });

        return view('administration.mascots.upload-artwork', [

            'colors' => $colors,
            'mascots_categories' => $mascots_categories,
            'artwork_request_id' => $artwork_request_id,
            'artwork_index' => $artwork_index,
            'team_colors' => $team_colors,
            'artwork_request_user_id' => $artwork_request_user_id,

        ]);

    }

    public function addLogoRequestForm($logo_request_id, $logo_index, $logo_request_user_id)
    {
        $colors = $this->colorsClient->getColors();
        $raw_mascots_categories = $this->mascotsCategoryClient->getMascotCategories();
        $mascots_categories = array();
        $logo_request = $this->logoRequestsClient->getLogoRequest($logo_request_id);
        // $team_colors = $this->artworksClient->getOrderTeamColors($artwork_request->order_code);

        foreach($raw_mascots_categories as $mascot_category){
            if($mascot_category->active == 1){
                $mascots_categories[] = $mascot_category->name;
            }
        }

        $ordersAPIClient = new \App\APIClients\OrdersAPIClient();
        // $order = $ordersAPIClient->getOrderByOrderId($artwork_request->order_code);
        // $artwork_request_user_id = $order->user_id;

        $mascots_categories = array_sort($mascots_categories, function($value) {
            return sprintf('%s,%s', $value[0], $value[1]);
        });

        return view('administration.logo-requests.upload-logo-request', [

            'colors' => $colors,
            'mascots_categories' => $mascots_categories,
            'logo_request_id' => $logo_request_id,
            'logo_index' => $logo_index,
            // 'team_colors' => $team_colors,
            'logo_request_user_id' => $logo_request_user_id,

        ]);

    }

    public function addExistingArtworkForm($artwork_request_id, $artwork_index, $artwork_user_id)
    {
        $artwork_request = $this->artworksClient->getArtwork($artwork_request_id);

        $ordersAPIClient = new \App\APIClients\OrdersAPIClient();
        $order = $ordersAPIClient->getOrderByOrderId($artwork_request->order_code);
        $artwork_request_user_id = $order->user_id;

        return view('administration.mascots.upload-existing-artwork', [
            'artwork_request_id' => $artwork_request_id,
            'artwork_index' => $artwork_index,
            'artwork_request_user_id' => $artwork_request_user_id,
        ]);

    }

    public function addExistingLogoForm($logo_request_id, $logo_index, $logo_request_user_id)
    {
        return view('administration.logo-requests.upload-existing-logo', [
            'logo_request_id' => $logo_request_id,
            'logo_index' => $logo_index,
            'logo_request_user_id' => $logo_request_user_id,
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
        $brand = $request->input('brand');


        $sports = explode(",", $request->input('sports_value'));
        $data = [
            'name' => $mascotName,
            'code' => $code,
            'category' => $category,
            // 'team_color_id' => $team_color_id,
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
            $ctr = count((array) $mascotLayerFiles);
            if (is_array($mascotLayerFiles) || is_object($mascotLayerFiles)) {
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

        if($request->input('artwork_request_id') != null){
            $artworkRequestID = $request->input('artwork_request_id');
            $artworkIndex = $request->input('artwork_index');
            $artworkUserId = $request->input('artwork_user_id');
        } else {
            $artworkRequestID = $request->input('logo_request_id');
            $artworkIndex = $request->input('logo_index');
            $artworkUserId = $request->input('logo_request_user_id');
        }


        if ($request->input('custom_artwork_request')) {
            $artwork_request = (new CustomArtworkRequestAPIClient())->getByID($artworkRequestID);
        } else {
            $artwork_request = $this->logoRequestsClient->getLogoRequest($artworkRequestID);
        }

        if($request->input('artwork_request_id') != null){
            $ar_json = json_decode($artwork_request->artworks, 1);
        } else {
            $ar_json = json_decode($artwork_request->properties, 1);
        }

        $team_colors = array();

        /* Build colors, save to artwork json */
        $lpx = json_decode($layersProperties, 1);

        foreach($lpx as $layer) {
            array_push($team_colors, $layer);
        }

        $data = [
            'name' => $mascotName,
            'code' => $code,
            'category' => $category,
            'layers_properties' => $layersProperties,
            'user_id' => $artworkUserId,
            'brand' => $request->input('brand')
        ];

        $id = null;

        if (!empty($request->input('mascot_id'))) {
            $id = $request->input('mascot_id');
            $data['id'] = $id;
        }

        $myJson = json_decode($layersProperties, true);
        $materialFolder = $mascotName;

        try {
            $materialOptionFile = $request->file('icon');

            if (!is_null($materialOptionFile)) {
                if ($materialOptionFile->isValid()) {
                    $filename = Random::randomize(12);

                    $data['icon'] = FileUploader::upload($materialOptionFile, $mascotName, 'material_option', "materials", "{$materialFolder}/{$filename}.png");
                    // update artwork data
                    array_push($ar_json[$artworkIndex]['history'], $ar_json[$artworkIndex]['file']);
                    $ar_json[$artworkIndex]['updated'] = 1;
                    $ar_json[$artworkIndex]['approved'] = 0;
                    $ar_json[$artworkIndex]['user_rejected'] = 0;
                    $ar_json[$artworkIndex]['file'] = $data['icon'];
                    $ar_json[$artworkIndex]['colors'] = $team_colors;
                }
            } else {
                array_push($ar_json[$artworkIndex]['history'], $ar_json[$artworkIndex]['file']);
                $ar_json[$artworkIndex]['updated'] = 1;
                $ar_json[$artworkIndex]['approved'] = 0;
                $ar_json[$artworkIndex]['user_rejected'] = 0;
                $ar_json[$artworkIndex]['colors'] = $team_colors;
            }
        } catch (S3Exception $e) {
            $message = $e->getMessage();
            if($request->input('artwork_request_id') != null){
                return Redirect::to('/administration/artwork_requests')->with('message', 'There was a problem uploading your files');
            } else {
                return Redirect::to('/administration/logo_requests')->with('message', 'There was a problem uploading your files');
            }
        }

        try {
            $mascotLayerFiles = $request->file('ma_image');
            $ctr = count($mascotLayerFiles);

            foreach ($mascotLayerFiles as $mascotLayerFile) {
                if (!is_null($mascotLayerFile)) {
                    if ($mascotLayerFile->isValid()) {
                        $filename = Random::randomize(12);
                        $myJson[(string)$ctr]['filename'] = FileUploader::upload($mascotLayerFile, $mascotName, 'material_option', "materials", "{$materialFolder}/{$filename}.png");
                    }
                }

                $ctr--;
            }
        } catch (S3Exception $e) {
            $message = $e->getMessage();
            if($request->input('artwork_request_id') != null){
                return Redirect::to('/administration/artwork_requests')->with('message', 'There was a problem uploading your files');
            } else {
                return Redirect::to('/administration/logo_requests')->with('message', 'There was a problem uploading your files');
            }
        }


        $data['layers_properties'] = json_encode($myJson, JSON_UNESCAPED_SLASHES);
        $folder_name = "mascot_ai_files";

        // Upload Ai File
        try {
            $newFile = $request->file('ai_file');

            if (!is_null($newFile)) {
                if ($newFile->isValid()) {
                    $randstr = Random::randomize(12);
                    $data['ai_file'] = FileUploaderV2::upload($newFile, $randstr, 'file', $folder_name);
                }
            }
        } catch (S3Exception $e) {
            $message = $e->getMessage();
            if($request->input('artwork_request_id') != null){
                return Redirect::to('/administration/artwork_requests')->with('message', 'There was a problem uploading your files');
            } else {
                return Redirect::to('/administration/logo_requests')->with('message', 'There was a problem uploading your files');
            }
        }

        $response = null;

        if (!empty($id)) {
            Log::info('Attempts to update Mascot#' . $id);
        } else {
            Log::info('Attempts to create a new Mascot ' . json_encode($data));

            $response = $this->client->createArtwork($data);

            if ($response->success) {
                if($request->input('artwork_request_id') != null){
                    (new CustomArtworkRequestAPIClient())->update($artworkRequestID, $response->art_id);
                }
            }

            $ar_json[$artworkIndex]['mascot_id'] = $response->art_id;

            // $artwork_request->artworks = $ar_json;
            if($request->input('artwork_request_id') != null){
                $artwork_request->artworks = $ar_json;
                $this->artworksClient->updateArtwork($artwork_request);
            } else {
                $artwork_request->properties = $ar_json;
                // dd(json_encode($artwork_request));
                $artwork_request->status = "for_review";
                $this->logoRequestsClient->updateLogoRequest($artwork_request);
            }
        }

        if ($response->success) {
            Log::info('Success');
            if($request->input('artwork_request_id') != null){
                return Redirect::to('administration/artwork_requests')->with('message', 'Successfully saved changes');
            } else {
                return Redirect::to('administration/logo_requests')->with('message', 'Successfully saved changes');
            }
        } else {
            Log::info('Failed');
            if($request->input('artwork_request_id') != null){
                return Redirect::to('administration/artwork_requests')->with('message', $response->message);
            } else {
                return Redirect::to('administration/logo_requests')->with('message', $response->message);
            }
        }
    }

    public function storeExistingArtwork(Request $request)
    {
        $mascotId = $request->input('mascot_id');
        $mascot = $this->client->getMascot($mascotId);
        $artworkRequestID = $request->input('artwork_request_id');
        $artworkIndex = $request->input('artwork_index');
        $artworkUserId = $request->input('artwork_user_id');

        if ($request->input('custom_artwork_request')) {
            $artwork_request = (new CustomArtworkRequestAPIClient())->getByID($artworkRequestID);
        } else {
            $artwork_request = $this->artworksClient->getArtwork($artworkRequestID);
        }

        $ar_json = json_decode($artwork_request->artworks, 1);

        $team_colors = array();

        /* Build colors, save to artwork json */
        $layersProperties = $mascot->layers_properties;
        $lpx = json_decode($layersProperties, 1);

        foreach($lpx as $layer) {
            array_push($team_colors, $layer);
        }

        $myJson = json_decode($layersProperties, true);

        array_push($ar_json[$artworkIndex]['history'], $ar_json[$artworkIndex]['file']);
        $ar_json[$artworkIndex]['updated'] = 1;
        $ar_json[$artworkIndex]['file'] = $mascot->icon;
        $ar_json[$artworkIndex]['colors'] = $team_colors;

        $folder_name = "mascot_ai_files";

        $response = null;

        $ar_json[$artworkIndex]['mascot_id'] = $mascotId;

        $artwork_request->artworks = $ar_json;
        $artwork_request->status = "for_review";
        $artwork_request->user_id = $artworkUserId;

        $response = $this->artworksClient->updateArtwork($artwork_request);

        if ($response->success) {
            Log::info('Success');

            return Redirect::to('administration/artwork_requests')->with('message', 'Successfully saved changes');
        } else {
            Log::info('Failed');

            return Redirect::to('administration/artwork_requests')->with('message', $response->message);
        }
    }

    public function storeExistingLogo(Request $request)
    {
        $mascotId = $request->input('mascot_id');
        $mascot = $this->client->getMascot($mascotId);
        $logoRequestID = $request->input('logo_request_id');
        $logoIndex = $request->input('logo_index');
        $logoRequestUserId = $request->input('logo_request_user_id');

        // if ($request->input('custom_artwork_request')) {
        //     $artwork_request = (new CustomArtworkRequestAPIClient())->getByID($logoRequestID);
        // } else {
        //     $artwork_request = $this->artworksClient->getArtwork($logoRequestID);
        // }
        $logo_request = $this->logoRequestsClient->getLogoRequest($logoRequestID);

        $ar_json = json_decode($logo_request->properties, 1);

        $team_colors = array();

        /* Build colors, save to artwork json */
        $layersProperties = $mascot->layers_properties;
        $lpx = json_decode($layersProperties, 1);

        foreach($lpx as $layer) {
            array_push($team_colors, $layer);
        }

        $myJson = json_decode($layersProperties, true);

        array_push($ar_json[$logoIndex]['history'], $ar_json[$logoIndex]['file']);
        $ar_json[$logoIndex]['updated'] = 1;
        $ar_json[$logoIndex]['file'] = $mascot->icon;
        $ar_json[$logoIndex]['colors'] = $team_colors;

        $folder_name = "mascot_ai_files";

        $response = null;

        $ar_json[$logoIndex]['mascot_id'] = $mascotId;
        unset($ar_json[$logoIndex]['user_rejected']);
        $ar_json[$logoIndex]['approved'] = 0;

// dd($ar_json);
        $logo_request->id = (string)$logo_request->id;
        // $logo_request->artworks = $ar_json;
        $logo_request->properties = $ar_json;
        $logo_request->status = "for_review";
        $logo_request->user_id = $logoRequestUserId;

        unset($logo_request->created_at);
        unset($logo_request->deleted_at);
        unset($logo_request->datetime_finished);

        $response = $this->logoRequestsClient->updateLogoRequest($logo_request);

        if ($response->success) {
            Log::info('Success');

            return Redirect::to('administration/logo_requests')->with('message', 'Successfully saved changes');
        } else {
            Log::info('Failed');

            return Redirect::to('administration/logo_requests')->with('message', $response->message);
        }
    }
}
