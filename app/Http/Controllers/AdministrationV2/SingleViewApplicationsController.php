<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\SingleViewApplicationsAPIClient as APIClient;

class SingleViewApplicationsController extends Controller
{

    public function __construct(
        APIClient $apiClient
    )
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $single_view_applications = $this->client->getAll();

        return view('administration-lte-2.single-view-applications.single-view-applications', [
            'single_view_applications' => $single_view_applications
        ]);

    }
}
