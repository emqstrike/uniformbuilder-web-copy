<?php

namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\OrdersAPIClient as APIClient;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;

class OrdersController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function ordersMinified($from = null, $to = null, $test_order = null)
    {
        if ($from == null) {
            $from = Carbon::now()->subDays(30)->format("Y-m-d");
        }

        if ($to == null) {
            $to = Carbon::now()->format("Y-m-d");
        }

        if ($test_order == null) {
            $test_order = 1;
        }

        $filters = [];

        if (Input::get('unassigned')) {
            $filters['unassigned'] = Input::get('unassigned');
        }

        if (Input::get('deleted')) {
            $filters['deleted'] = Input::get('deleted');
        }

        $orders = $this->client->getOrdersMinified($filters, $from, $to, $test_order);

        foreach($orders as $order) {
            $order->created_at = date('M-d-Y', strtotime($order->created_at));
        }

        return view('administration-lte-2.orders.orders', [
            'orders' => $orders,
            'from_date' => $from,
            'to_date' => $to,
            'test_order' => $test_order,
            'filters' => $filters
        ]);
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

    public function testOrders(Request $request)
    {
        $orders = $this->client->getTestOrders();

        foreach($orders as $order)
        {
            $order->created_at = date('M-d-Y', strtotime($order->created_at));
        }

        return view('administration.orders.test-orders', [
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

    public function indexSearchOrder(Request $request)
    {
        return view('administration.orders.search-order');
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

    public function orderSearch($foid)
    {
        $order = $this->client->searchOrderByFOID($foid);
        // dd($order);
        if($order){
            return view('administration.orders.search-result', [
                'order' => $order
            ]);
        } else {
            dd("Order not found");
        }
    }

}
