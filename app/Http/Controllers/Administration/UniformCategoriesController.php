<?php
namespace App\Http\Controllers\Administration;

use \Session;
use App\Http\Requests;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;
use App\APIClients\UniformCategoriesAPIClient as APIClient;

class UniformCategoriesController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $categories = $this->client->getUniformCategories();

        return view('administration.categories.categories', [
            'categories' => $categories,
            'api_host' => env('API_HOST')
        ]);
    }
}
