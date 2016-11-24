<?php

namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\OrdersAPIClient as APIClient;

class ArtworksController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index(Request $request)
    {
        $status = $request->get('status');
        if (is_null($status))
        {
            $orders = $this->client->getOrdersArtwork();
        }
        else
        {
            $orders = $this->client->getOrdersArtwork($status);
        }
        $ctr = 0;
        foreach($orders as $order)
        {

            $data = json_decode($order->items[0]->attached_files, 1);
            try {
                if(isset($data[0]['code']) && $order->status === "new")
                {
                    $order->artworks = $data;
                } else {
                    // $order->artworks = null;
                    unset($orders[$ctr]);
                }
            } catch (Exception $e) {
                error_log($e->getMessage());
            }
            $ctr++;
        }
        // dd($orders);
        $account_type = Session::get('accountType');
        $user_id = Session::get('userId');

        return view('administration.artworks.artwork_requests', [
            'orders' => $orders,
            'account_type' => $account_type,
            'user_id' => $user_id
        ]);
    }

}