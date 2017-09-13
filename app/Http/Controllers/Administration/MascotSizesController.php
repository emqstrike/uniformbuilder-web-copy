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
use App\APIClients\MascotSizesAPIClient as APIClient;

class MascotSizesController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    /**
     * MascotSizes
     */
    public function index()
    {

     
        $mascot_sizes = $this->client->getMascotSizes();
        return view('administration.mascots.mascot-size', [
            'mascot_sizes' => $mascot_sizes
        ]);
    }

    public function addMascotSizeForm()
    {
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $sports = $categoriesAPIClient->getUniformCategories();
        return view('administration.mascots.mascot-size-create', [
           'sports' => $sports
        ]);
    }

    public function editMascotSizeForm($id)
    {   
        
        $mascot_size = $this->client->getMascotSize($id);
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $sports = $categoriesAPIClient->getUniformCategories();
        
        return view('administration.mascots.mascot-size-edit', [
            'sports' => $sports,
            'mascot_size' => $mascot_size
        ]);
    }

    public function store(Request $request)
    {


        $sport = $request->input('sport');
        $properties = $request->input('props_data');
        $type = $request->input('type');
        if( $request->input('block_pattern_options_value') ){
            $blockPatternOptions = explode(",", $request->input('block_pattern_options_value'));
        } else {
            $blockPatternOptions = "";
        }

        $mascot_size_id = null;
        if (!empty($request->input('mascot_size_id')))
        {
            $mascot_size_id = $request->input('mascot_size_id');
        }

        $data = [
            'sport' => $sport,
            'properties' => $properties,
            'block_pattern_options' => $blockPatternOptions,
            'type' => $type
        ];
// dd($data);
        $response = null;
        if (!empty($mascot_size_id))
        {
            Log::info('Attempts to update MascotSize#' . $mascot_size_id);
            $data['id'] = $mascot_size_id;

           
            $response = $this->client->updateMascotSize($data);
            return Redirect::to('administration/mascot_size/edit/' . $data['id'])
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Attempts to create a new Mascot Size ' . json_encode($data));
            $response = $this->client->createMascotSize($data);
        }

        if ($response->success)
        {

            Log::info('Success');
            return Redirect::to('administration/mascot_sizes')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/mascot_sizes')
                            ->with('message', 'There was a problem saving your mascot_size');
        }
    }
}
