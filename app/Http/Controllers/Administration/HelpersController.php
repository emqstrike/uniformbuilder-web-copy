<?php
namespace Customizer\Http\Controllers\Administration;

use \Session;
use \Redirect;
use Customizer\Http\Requests;
use Customizer\Utilities\Log;
use Illuminate\Http\Request;
use Customizer\Utilities\FileUploader;
use Customizer\Utilities\Random;
use Webmozart\Json\JsonDecoder;
use Customizer\Http\Controllers\Controller;
use Customizer\APIClients\UniformCategoriesAPIClient;
use Customizer\APIClients\HelpersAPIClient as APIClient;

class HelpersController extends Controller
{
    protected $client;
    protected $categoriesClient;
    // protected $featureFlagsClient;

    public function __construct(
        APIClient $apiClient,
        UniformCategoriesAPIClient $categoriesClient
        // FeatureFlagsAPIClient $featureFlagsClient
    )
    {
        $this->client = $apiClient;
        $this->categoriesClient = $categoriesClient;
        // $this->featureFlagsClient = $FeatureFlagsAPIClient;
    }

    public function index()
    {
        $helpers = $this->client->getHelpers();

        return view('administration.helpers.helpers', [
            'helpers' => $helpers
        ]);
    }

    public function editForm($id)
    {
        $helper = $this->client->getHelper($id);
        $sports = $this->categoriesClient->getUniformCategories();
        $helpers = $this->client->getHelpers();
        return view('administration.helpers.helper-edit', [
            'helper' => $helper,
            'sports' => $sports,
            'helpers' => $helpers
        ]);
    }

    public function addForm()
    {
        $sports = $this->categoriesClient->getUniformCategories();
        $helpers = $this->client->getHelpers();
        return view('administration.helpers.helper-create', [
            'sports' => $sports,
            'helpers' => $helpers
        ]);
    }

    public function store(Request $request)
    {
        $feature = $request->input('feature');
        $group = $request->input('group');
        $category = $request->input('category');
        $sports = explode(",", $request->input('sports_value'));
        $video_url = $request->input('video_url');
        $gif_url = $request->input('gif_url');
        $pdf_url = $request->input('pdf_url');
        $active = $request->input('active');
        $index = $request->input('index');
        $description = $request->input('description');
        $related_fields = explode(",", $request->input('related_value'));
        $data = [
            'feature' => $feature,
            'group' => $group,
            'category' => $category,
            'sports' => $sports,
            'video_url' => $video_url,
            'gif_url' => $gif_url,
            'pdf_url' => $pdf_url,
            'active' => $active,
            'index' => $index,
            'description' => $description,
            'related_fields' => $related_fields
        ];

        $id = null;
        if (!empty($request->input('helper_id')))
        {
            $id = $request->input('helper_id');
            $data['id'] = $id;
        }
// dd($data);
        $response = null;
        if (!empty($request->input('helper_id')))
        {
            Log::info('Attempts to update Helper' . $id);
            $response = $this->client->updateHelper($data);
        }
        else
        {
            Log::info('Attempts to create a new Helper ' . json_encode($data));
            $response = $this->client->createHelper($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/helpers')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/helpers')
                            ->with('message', $response->message);
        }
    }
}