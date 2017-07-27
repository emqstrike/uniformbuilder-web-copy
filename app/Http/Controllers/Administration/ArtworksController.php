<?php

namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\ArtworksAPIClient;
use App\APIClients\OrdersAPIClient as APIClient;

class ArtworksController extends Controller
{
    protected $client;
    protected $artworksClient;

    public function __construct(
        APIClient $apiClient,
        ArtworksAPIClient $artworksClient
    )
    {
        $this->client = $apiClient;
        $this->artworksClient = $artworksClient;
    }

    public function index(Request $request)
    {
        $orders = $this->client->getOrdersArtwork();

        $ctr = 0;
        foreach($orders as $order)
        {
            try {
                if(isset($order->items[0]))
                {
                    $order->artworks = null;
                    $data = json_decode($order->items[0]->attached_files, 1);
                    try {
                        if(isset($data[0]['code']) && $order->status === "new")
                        {
                            $order->artworks = $data;
                        } else {
                            unset($orders[$ctr]);
                        }
                    } catch (Exception $e) {
                        error_log($e->getMessage());
                    }
                    $ctr++;
                }
            } catch (Exception $e) {
                error_log($e->getMessage());
            }
        }

        $account_type = Session::get('accountType');
        $user_id = Session::get('userId');

        return view('administration.artworks.artwork_requests', [
            'orders' => $orders,
            'account_type' => $account_type,
            'user_id' => $user_id
        ]);
    }

    public function processing(Request $request)
    {
        $artworks = $this->artworksClient->getArtworks('processing');

        $ctr = 0;
        if($artworks){
            foreach($artworks as $artwork)
            {
                $order = $this->client->getOrderByOrderId($artwork->order_code);
// dd($order);
                if($order){
                    $artwork->user_id = $order->user_id;

                    if($artwork->artworks != '""'){
                        $data = json_decode($artwork->artworks, 1);
                        if(is_array($data)){
                            $artwork->artworks = $data;
                        } else {
                            unset($artworks[$ctr]);
                        }
                    } else {
                        unset($artworks[$ctr]);
                    }
                } else {
                    unset($artworks[$ctr]);
                }
                $ctr++;
            }
        }
        // dd($artworks);
        $account_type = Session::get('accountType');
        $user_id = Session::get('userId');

        return view('administration.artworks.on-process-artwork-requests', [
            'artworks' => $artworks,
            'account_type' => $account_type,
            'user_id' => $user_id
        ]);
    }

}