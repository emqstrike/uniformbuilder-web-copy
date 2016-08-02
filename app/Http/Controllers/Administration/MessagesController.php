<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
// use App\APIClients\PriceItemsAPIClient as APIClient;

class MessagesController extends Controller
{
    protected $client;

    // public function __construct(APIClient $apiClient)
    // {
    //     $this->client = $apiClient;
    // }

    /**
     * Price Items
     */
    public function index()
    {
        // $price_items = $this->client->getAllPriceItems();

        return view('administration.messages.messages', [
            'messages' => null
        ]);
    }

    public function composeForm()
    {
        // $price_items = $this->client->getAllPriceItems();

        return view('administration.messages.message-compose');
    }

    // public function materialsTable()
    // {
    //     return view('administration.price-items.list-materials');
    // }

}
