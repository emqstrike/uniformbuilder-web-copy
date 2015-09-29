<?php

namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\OrdersAPIClient as APIClient;

class OrdersController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $orders = $this->client->getOrders();

        return view('administration.orders.orders', [
            'orders' => $orders,
            'order_statuses' => [
                'pending',
                'new',
                'production',
                'finished',
                'rejected',
                'cancelled',
                'needs action',
                'completed',
                'refunded',
                'disputed'
            ]
        ]);
    }

    public function updateStatus($status)
    {
        $response = $this->client->updateStatus('order/updateStatus', [
            'status' => $status
        ]);
    }

}
