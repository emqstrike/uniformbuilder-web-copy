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
use App\APIClients\BlockPatternsAPIClient;
use App\APIClients\MascotSizesAPIClient as APIClient;

class MascotSizesController extends Controller
{
    protected $client;

    public function __construct(
        APIClient $apiClient,
        BlockPatternsAPIClient $blockPatternsAPIClient
    )
    {
        $this->client = $apiClient;
        $this->blockPatternClient = $blockPatternsAPIClient;
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
        $block_patterns = $this->blockPatternClient->getBlockPatterns();
        return view('administration.mascots.mascot-size-create', [
           'sports' => $sports,
           'block_patterns' => $block_patterns
        ]);
    }

    public function editMascotSizeForm($id)
    {

        $mascot_size = $this->client->getMascotSize($id);
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $sports = $categoriesAPIClient->getUniformCategories();
        $block_patterns = $this->blockPatternClient->getBlockPatterns();
        return view('administration.mascots.mascot-size-edit', [
            'sports' => $sports,
            'mascot_size' => $mascot_size,
            'block_patterns' => $block_patterns
        ]);
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        $uniform_category_id = $request->input('uniform_category_id');
        $properties = $request->input('props_data');
        $type = $request->input('type');
        $active = $request->input('active');
        $notes = $request->input('notes');
        $brand = $request->input('brand');


        if( $request->input('block_pattern_value') ){
            $blockPatterns = explode(",", $request->input('block_pattern_value'));
        } else {
            $blockPatterns = "";
        }

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
            'name' => $name,
            'properties' => $properties,
            'block_pattern_options' => $blockPatternOptions,
            'type' => $type,
            'active' => $active,
            'notes' => $notes,
            'block_patterns' => $blockPatterns,
            'brand' => $brand,
            'uniform_category_id' => $uniform_category_id
        ];

        $response = null;
        if (!empty($mascot_size_id))
        {
            Log::info('Attempts to update MascotSize#' . $mascot_size_id);
            $data['id'] = $mascot_size_id;

            $response = $this->client->updateMascotSize($data);
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
