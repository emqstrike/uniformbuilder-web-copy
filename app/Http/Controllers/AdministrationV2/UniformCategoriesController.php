<?php
namespace App\Http\Controllers\AdministrationV2;

use App\APIClients\UniformCategoriesAPIClient as APIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\UniformCategoryRequest;
use App\Utilities\Log;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use \Redirect;
use \Session;

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
        return view('administration-lte-2.categories.categories', [
            'categories' => $categories
        ]);
    }
}
