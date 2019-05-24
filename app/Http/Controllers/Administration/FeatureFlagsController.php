<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;
use App\APIClients\UniformCategoriesAPIClient;
use App\APIClients\UsersAPIClient;
use App\APIClients\FeatureFlagsAPIClient as APIClient;

class FeatureFlagsController extends Controller
{
    protected $client;
    protected $categoriesClient;
    protected $usersClient;
    // protected $featureFlagsClient;

    public function __construct(
        APIClient $apiClient,
        UniformCategoriesAPIClient $categoriesClient,
        UsersAPIClient $usersClient
        // FeatureFlagsAPIClient $featureFlagsClient
    )
    {
        $this->client = $apiClient;
        $this->categoriesClient = $categoriesClient;
        $this->usersClient = $usersClient;
        // $this->featureFlagsClient = $FeatureFlagsAPIClient;
    }

    public function index()
    {
        $feature_flags = $this->client->getFeatureFlags();

        return view('administration.feature-flags.feature-flags', [
            'feature_flags' => $feature_flags
        ]);
    }

    public function editForm($id)
    {
        $feature_flag = $this->client->getFeatureFlag($id);
        $sports = $this->categoriesClient->getUniformCategories();
        $users = $this->usersClient->getUsers();
        return view('administration.feature-flags.feature-flag-edit', [
            'feature_flag' => $feature_flag,
            'sports' => $sports,
            'users' => $users,        
        ]);
    }

    public function addForm()
    {
        $sports = $this->categoriesClient->getUniformCategories();
        $users = $this->usersClient->getUsers();
        return view('administration.feature-flags.feature-flag-create', [
            'sports' => $sports,
            'users' => $users            
        ]);
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        $group = $request->input('group');
        $category = $request->input('category');
        $description = $request->input('description');
        $active = $request->input('active');
        $user_types = explode(",", $request->input('users_types_value'));
        $roles = explode(",", $request->input('users_roles_value'));
        $sports = explode(",", $request->input('sports_value'));
        $switch = $request->input('switch');
        $state = $request->input('state');
        $users = explode(",", $request->input('users_value'));
        $beta = $request->input('beta');

        $data = [
            'name' => $name,
            'group' => $group,
            'category' => $category,
            'description' => $description,
            'active' => $active,
            'user_types' => $user_types,
            'roles' => $roles,
            'switch' => $switch,
            'state' => $state,
            'sports' => $sports,
            'user_ids' => $users,
            'beta' => $beta
        ];
        
        $id = null;
        if (!empty($request->input('feature_flag_id')))
        {
            $id = $request->input('feature_flag_id');
            $data['id'] = $id;
        }

        $response = null;
        if (!empty($request->input('feature_flag_id')))
        {
            Log::info('Attempts to update Feature Flag' . $id);
            $response = $this->client->updateFeatureFlag($data);
        }
        else
        {
            Log::info('Attempts to create a new Feature Flag ' . json_encode($data));
            $response = $this->client->createFeatureFlag($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/feature_flags')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/feature_flags')
                            ->with('message', $response->message);
        }
    }
}