<?php

namespace App\Http\Controllers\AdministrationV2;

use App\APIClients\SavedDesignsAPIClient as APIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use JasonGrimes\Paginator;

class SavedDesignsController extends Controller
{
    protected $client;
    protected $categoriesClient;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index($currentPage = null)
    {
        if (is_null($currentPage)) {
            $currentPage = 1;
        }

        $savedDesigns = $this->client->getPaginated($currentPage);

        foreach ($savedDesigns->data as $savedDesign) {
            $savedDesign->created_at = date('M-d-Y', strtotime($savedDesign->created_at));
        }

        $paginator = new Paginator($savedDesigns->total, 30, $currentPage, route('saved_designs'));

        return view('administration-lte-2.saved-designs.index', compact('savedDesigns', 'paginator'));
    }
}
