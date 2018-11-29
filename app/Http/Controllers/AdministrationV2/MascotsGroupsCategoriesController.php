<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;

use App\APIClients\MascotsGroupsCategoriesAPIClient as APIClient;

class MascotsGroupsCategoriesController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $mascots_groups_categories = $this->client->getMascotsGroupsCategories();

        return view('administration-lte-2.mascots.mascot-groups-categories', [
            'mascots_groups_categories' => $mascots_groups_categories
        ]);
    }

}
