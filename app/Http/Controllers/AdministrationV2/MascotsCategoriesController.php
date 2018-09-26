<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;
use App\APIClients\MascotsCategoriesAPIClient as APIClient;

class MascotsCategoriesController extends Controller
{
    protected $client;
    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $mascots_categories = $this->client->getMascotCategories();

        return view('administration-lte-2.mascots.mascot-categories', [
            'mascots_categories' => $mascots_categories
        ]);
    }
}
