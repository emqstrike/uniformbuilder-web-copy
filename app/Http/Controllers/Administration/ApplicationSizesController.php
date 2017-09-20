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
use App\APIClients\ApplicationSizesAPIClient as APIClient;

class ApplicationSizesController extends Controller
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
        $application_sizes = $this->client->getAll();

        return view('administration.applications.application-sizes', [
            'application_sizes' => $application_sizes
        ]);

    }

    public function addForm()
    {
        $sports = $this->uniformCategoriesClient->getUniformCategories();

        return view('administration.applications.application-size-create', [
            'sports' => $sports
        ]);
    }

    public function editForm($id)
    {
        $sports = $this->uniformCategoriesClient->getUniformCategories();
        $application_size = $this->client->getApplicationSize($id);

        return view('administration.applications.application-sizes-edit', [
            'application_size' => $application_size,
            'sports' => $sports
        ]);
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        $uniform_category_id = $request->input('uniform_category_id');
        $type = $request->input('type');
        $properties = $request->input('properties');
        $data = [
            'name' => $name,
            'uniform_category_id' => $uniform_category_id,
            'type' => $type,
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
