<?php

namespace Customizer\Http\Controllers\Administration;

use \Session;
use \Redirect;
use Customizer\Http\Requests;
use Customizer\Utilities\Log;
use Illuminate\Http\Request;
use Customizer\Http\Controllers\Controller;
use Customizer\APIClients\OrdersAPIClient as APIClient;

class OrdersController extends Controller
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
            $orders = $this->client->getOrders();
        }
        else
        {
            $orders = $this->client->getOrders($status);
        }

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