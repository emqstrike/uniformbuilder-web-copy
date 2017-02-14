<?php

namespace Customizer\Http\Controllers\Administration;

use \Redirect;
use Customizer\Http\Requests;
use Customizer\Utilities\Log;
use Illuminate\Http\Request;
use Customizer\Http\Controllers\Controller;
use Customizer\APIClients\PriceItemsAPIClient as APIClient;

class PriceItemsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    /**
     * Price Items
     */
    public function index()
    {
        $price_items = $this->client->getAllPriceItems();

        return view('administration.price-items.price-items', [
            'price_items' => $price_items
        ]);
    }

    public function materialsTable()
    {
        return view('administration.price-items.list-materials');
    }

}
