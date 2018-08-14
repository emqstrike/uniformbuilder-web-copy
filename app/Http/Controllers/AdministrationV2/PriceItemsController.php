<?php

namespace App\Http\Controllers\AdministrationV2;

use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\PriceItemsAPIClient as APIClient;
use App\APIClients\UniformCategoriesAPIClient;

class PriceItemsController extends Controller
{
    protected $client;
    protected $uniformCategoriesClient;

    public function __construct(
        APIClient $apiClient,
        UniformCategoriesAPIClient $uniformCategoriesClient
        )
    {
        $this->client = $apiClient;
        $this->uniformCategoriesClient = $uniformCategoriesClient;
    }

    /**
     * Price Items
     */
    public function index()
    {
        $price_items = $this->client->getAllPriceItems();

        return view('administration-lte-2.price-items.price-items', [
            'price_items' => $price_items
        ]);
    }

    public function manualUpdate()
    {
        return view('administration.price-items.manual-update');
    }

    public function addPriceItem()
    {
        $sports = $this->uniformCategoriesClient->getUniformCategories();
        return view('administration.price-items.price-item-create',[
            'sports' => $sports
            ]);

    }

    public function store(Request $request)
    {
        $price_item_name = $request->input('price_item_name');
        $price_item_id = $request->input('price_item_id');
        $dealer_id = $request->input('dealer_id');
        $msrp = $request->input('msrp');
        $web_price_sale = $request->input('web_price_sale');
        $sport = $request->input('sport');
        $factory = $request->input('factory');
        $array_data = [];
        $data = [
            'PriceItemName' => $price_item_name,
            'PriceItemID' => $price_item_id,
            'DealerID' => $dealer_id,
            'MSRPPrice' => $msrp,
            'WebPriceSale' => $web_price_sale,
            'Sport' => $sport,
            'Factory' => $factory
        ];
        array_push($array_data, $data);
        $response = $this->client->createPriceItem($array_data);
        if ($response->success)
        {
            return Redirect::to('administration/price_items')
                            ->with('message', $response->message);
        }
        else
        {
            return Redirect::to('administration/price_items')
                            ->with('message', $response->message);
        }
    }
}
