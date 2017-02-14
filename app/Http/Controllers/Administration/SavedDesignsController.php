<?php
namespace Customizer\Http\Controllers\Administration;

use \Session;
use \Redirect;
use Customizer\Http\Requests;
use Customizer\Utilities\Log;
use Illuminate\Http\Request;
use Customizer\Utilities\FileUploader;
use Customizer\Utilities\Random;
use Webmozart\Json\JsonDecoder;
use Customizer\Http\Controllers\Controller;
use Customizer\APIClients\SavedDesignsAPIClient as APIClient;

class SavedDesignsController extends Controller
{
    protected $client;
    protected $categoriesClient;

    public function __construct(
        APIClient $apiClient
    )
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $saved_designs = $this->client->getAll();

        return view('administration.saved-designs.saved-designs', [
            'saved_designs' => $saved_designs
        ]);
    }
}