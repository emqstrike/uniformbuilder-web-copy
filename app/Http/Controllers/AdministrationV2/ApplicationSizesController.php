<?php
namespace App\Http\Controllers\AdministrationV2;

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

        return view('administration-lte-2.applications.application-sizes', [
            'application_sizes' => $application_sizes
        ]);
    }
}
