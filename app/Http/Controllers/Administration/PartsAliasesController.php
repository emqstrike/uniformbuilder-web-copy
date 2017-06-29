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

class PartsAliasesController extends Controller
{
    protected $client;

    public function __construct(
        APIClient $apiClient
    )
    {

        $this->client = $apiClient;

    }

    public function index()
    {
        $parts_aliases = $this->client->getAll();
       
        return view('administration.parts-aliases.parts-aliases', [
            'parts_aliases' => $parts_aliases
        ]);
    }

    public function addForm()
    {
        return view('administration.parts-aliases.parts-aliases-create');
    }

}
