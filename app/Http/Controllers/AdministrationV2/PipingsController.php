<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\PipingsAPIClient as APIClient;

class PipingsController extends Controller
{

    public function __construct(
        APIClient $apiClient
    )
    {
        $this->client = $apiClient;
    }

    public function index()
    {

        $pipings = $this->client->getAllPipings();


        return view('administration-lte-2.pipings.pipings', [
            'pipings' => $pipings
        ]);

    }
}
