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
use App\APIClients\UniformCategoriesAPIClient;
use App\APIClients\ReversibleGroupsAPIClient as APIClient;

class ReversibleGroupsController extends Controller
{
    protected $client;
    protected $uniformCategoriesClient;

    public function __construct(
        APIClient $apiClient,
        UniformCategoriesAPIClient $uniformCategoriesClient
    )
    {
        $this->client = $apiClient;
        $this->uniformCategoriesClient = $uniformCategoriesClient;
    }

    public function index()
    {
        $reversible_groups = $this->client->getAll();

        return view('administration.reversible-groups.reversible-groups', [
            'reversible_groups' => $reversible_groups
        ]);

    }

    public function create()
    {
        $sports = $this->uniformCategoriesClient->getUniformCategories();

        return view('administration.reversible-groups.reversible-groups-create', [
            'sports' => $sports
        ]);
    }

    public function edit($id)
    {
        $sports = $this->uniformCategoriesClient->getUniformCategories();
        $reversible_groups = $this->client->getReversibleGroups($id);

        return view('administration.reversible-groups.reversible-groups-edit', [
            'reversible_groups' => $reversible_groups,
            'sports' => $sports
        ]);
    }

    public function store(Request $request)
    {
        $uniform_category_id = $request->input('uniform_category_id');
        $sport = $request->input('sport');
        $description = $request->input('description');

        $data = [
            'uniform_category_id' => $uniform_category_id,
            'sport' => $sport,
            'description' => $description
        ];

        $id = null;
        if (!empty($request->input('id')))
        {
            $data['id']  = $request->input('id');
        }
        $response = null;
        if (!empty($request->input('id')))
        {
            Log::info('Attempts to update reversible groups' . $id);
            $response = $this->client->update($data);
        }
        else
        {
            Log::info('Attempts to create a new reversible groups ' . json_encode($data));
            $response = $this->client->create($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/reversible_groups')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/reversible_groups')
                            ->with('message', $response->message);
        }
    }

}
