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

        foreach($orders as $order)
        {
            $order->created_at = date('M-d-Y', strtotime($order->created_at));
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

    public function indexSentOrders(Request $request)
    {
        $orders = $this->client->getSentOrders();

        return view('administration.orders.orders-sent', [
            'orders' => $orders
        ]);
    }

    public function updateStatus($status)
    {
        $response = $this->client->updateStatus('order/updateStatus', [
            'status' => $status
        ]);
    }

}