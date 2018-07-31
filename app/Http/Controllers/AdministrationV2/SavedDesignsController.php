<?php

namespace App\Http\Controllers\AdministrationV2;

use Illuminate\Http\Request;
use App\APIClients\SavedDesignsAPIClient as APIClient;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class SavedDesignsController extends Controller
{
    protected $client;
    protected $categoriesClient;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $savedDesigns = $this->client->getAll();

        foreach ($savedDesigns as $savedDesign) {
            $savedDesign->created_at = date('M-d-Y', strtotime($savedDesign->created_at));
        }

        return view('administration-lte-2.saved-designs.index', compact('savedDesigns'));
    }
}
