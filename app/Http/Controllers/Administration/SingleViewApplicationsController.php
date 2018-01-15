<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\BlockPatternsAPIClient;
use App\APIClients\UniformCategoriesAPIClient;
use App\APIClients\SingleViewApplicationsAPIClient as APIClient;

class SingleViewApplicationsController extends Controller
{
    protected $client;
    protected $blockPatternClient;
    protected $uniformCategoriesClient;

    public function __construct(
        APIClient $apiClient,
        BlockPatternsAPIClient $blockPatternsAPIClient,
        UniformCategoriesAPIClient $uniformCategoriesClient
    )
    {
        $this->client = $apiClient;
        $this->blockPatternClient = $blockPatternsAPIClient;
        $this->uniformCategoriesClient = $uniformCategoriesClient;
    }

    public function index()
    {
        $single_view_applications = $this->client->getAll();

        return view('administration.single-view-applications.single-view-applications', [
            'single_view_applications' => $single_view_applications
        ]);

    }

    public function create()
    {
        $sports = $this->uniformCategoriesClient->getUniformCategories();
        $block_patterns = $this->blockPatternClient->getBlockPatterns();

        return view('administration.single-view-applications.single-view-applications-create', [
            'block_patterns' => $block_patterns,
            'sports' => $sports
        ]);
    }

    public function edit($id)
    {
        $sports = $this->uniformCategoriesClient->getUniformCategories();
        $single_view_applications = $this->client->getSingleViewApplications($id);
        $block_patterns = $this->blockPatternClient->getBlockPatterns();
        return view('administration.single-view-applications.single-view-applications-edit', [
            'single_view_applications' => $single_view_applications,
            'block_patterns' => $block_patterns,
            'sports' => $sports
        ]);
    }

    public function store(Request $request)
    {
        $uniform_category_id = $request->input('uniform_category_id');
        $type = $request->input('type');
        $active = $request->input('active');

        if( $request->input('block_pattern_value') ){
            $block = explode(",", $request->input('block_pattern_value'));
        } else {
            $block = "";
        }
        if( $request->input('neck_option_value') ){
            $neck = explode(",", $request->input('neck_option_value'));
        } else {
            $neck = "";
        }

        $data = [
            'uniform_category_id' => $uniform_category_id,
            'block_patterns' => $block,
            'neck_options' => $neck,
            'type' => $type,
            'active' => $active
        ];
        $id = null;
        if (!empty($request->input('id')))
        {
            $data['id']  = $request->input('id');
        }
        $response = null;
        if (!empty($request->input('id')))
        {
            Log::info('Attempts to update single view applications' . $id);
            $response = $this->client->update($data);
        }
        else
        {
            Log::info('Attempts to create a new single view applications ' . json_encode($data));
            $response = $this->client->create($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/single_view_applications')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/single_view_applications')
                            ->with('message', $response->message);
        }
    }

}
