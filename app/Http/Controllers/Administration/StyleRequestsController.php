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
use App\APIClients\StyleRequestsAPIClient as APIClient;
use App\APIClients\MaterialsAPIClient;

class StyleRequestsController extends Controller
{
    protected $client;
    protected $materialsClient;

    public function __construct(APIClient $apiClient, MaterialsAPIClient $materialsClient)
    {

        $this->client = $apiClient;
        $this->materialsClient = $materialsClient;

    }

    public function index()
    {
        $style_requests = $this->client->getAll();

        return view('administration.style-requests.style-requests', [
            'style_requests' => $style_requests
        ]);

    }

    public function styleViewer()
    {
        return view('administration.style-requests.style-viewer');

    }

    public function stylesStats()
    {
        return view('administration.style-requests.styles-stats');

    }

    public function approvedIndex()
    {
        $style_requests = $this->client->getApproved();

        return view('administration.style-requests.approved-style-requests', [
            'style_requests' => $style_requests
        ]);

    }

    public function stylesOnCustomizer()
    {
        $style_requests = $this->client->stylesOnCustomizer();

        return view('administration.style-requests.styles-on-customizer', [
            'style_requests' => $style_requests
        ]);

    }

}
