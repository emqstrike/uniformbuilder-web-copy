<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\Random;
use App\Http\Controllers\Controller;
use App\APIClients\HiddenBodiesAPIClient as APIClient;

class HiddenBodiesController extends Controller
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
        $hidden_bodies = $this->client->getAll();

        return view('administration-lte-2.hidden-body.hidden-body', [
            'hidden_bodies' => $hidden_bodies
        ]);
    }
}
