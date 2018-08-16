<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\PriceItemTemplatesAPIClient as APIClient;

class PriceItemTemplatesController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $price_item_templates = $this->client->getAll();
        return view('administration-lte-2.price-items.price-templates', [
            'price_item_templates' => $price_item_templates
        ]);
    }

}
