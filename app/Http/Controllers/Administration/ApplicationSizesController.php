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
use App\APIClients\ApplicationSizesAPIClient as APIClient;

class ApplicationSizesController extends Controller
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
        $application_sizes = $this->client->getAll();

        return view('administration.applications.application-sizes', [
            'application_sizes' => $application_sizes
        ]);

    }

    public function addForm()
    {
        $sports = $this->uniformCategoriesClient->getUniformCategories();
        $block_patterns = $this->blockPatternClient->getBlockPatterns();  

        return view('administration.applications.application-size-create', [
            'block_patterns' => $block_patterns,
            'sports' => $sports
        ]);
    }

    public function editForm($id)
    {
        $sports = $this->uniformCategoriesClient->getUniformCategories();
        $application_size = $this->client->getApplicationSize($id);
        $block_patterns = $this->blockPatternClient->getBlockPatterns();

        return view('administration.applications.application-sizes-edit', [
            'application_size' => $application_size,
            'block_patterns' => $block_patterns,
            'sports' => $sports
        ]);
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        $uniform_category_id = $request->input('uniform_category_id');        
        $notes = $request->input('notes');
        $type = $request->input('type');
        $uniform_application_type = $request->input('uniform_application_type');
        $properties = $request->input('properties');

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
            'name' => $name,
            'uniform_category_id' => $uniform_category_id,
            'block_pattern' => $block,
            'neck_option' => $neck,
            'notes' => $notes,
            'type' => $type,
            'uniform_application_type' => $uniform_application_type,
            'properties' => $properties
        ];        
        $id = null;
        if (!empty($request->input('application_size_id')))
        {
            $id = $request->input('application_size_id');
            $data['id'] = $id;
        }
        $response = null;
        if (!empty($request->input('application_size_id')))
        {
            Log::info('Attempts to update application sizes' . $id);
            $response = $this->client->update($data);
        }
        else
        {
            Log::info('Attempts to create a new application sizes ' . json_encode($data));
            $response = $this->client->create($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/application_sizes')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/application_sizes')
                            ->with('message', $response->message);
        }
    }

}
