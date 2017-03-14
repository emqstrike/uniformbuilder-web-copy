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

}
