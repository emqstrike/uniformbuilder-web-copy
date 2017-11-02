<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;
use App\APIClients\SavedDesignsAPIClient as APIClient;

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
        foreach($saved_designs as $saved_design)
            {
                $saved_design->created_at = date('M-d-Y', strtotime($saved_design->created_at));
            } 

        return view('administration.saved-designs.saved-designs', [
            'saved_designs' => $saved_designs
        ]);
    }
}