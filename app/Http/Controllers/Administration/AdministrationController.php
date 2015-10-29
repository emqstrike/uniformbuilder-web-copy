<?php
namespace App\Http\Controllers\Administration;

use \Session;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\OrdersAPIClient;
use GuzzleHttp\Exception\ClientException;

class AdministrationController extends Controller
{
    protected $ordersClient;

    public function __construct(
        OrdersAPIClient $ordersClient
    )
    {
        $this->ordersClient = $ordersClient;
    }

    public function index()
    {
        if (Session::has('isLoggedIn'))
        {
            if (Session::get('isLoggedIn') == true)
            {
                return view('welcome');
            }
        }
        return redirect('administration/login');
    }

    public function dashboard()
    {
        if (Session::has('isLoggedIn'))
        {
            if (Session::get('isLoggedIn') == true)
            {
                $newOrders = $this->ordersClient->countNewOrders();
                $pendingOrders = $this->ordersClient->countPendingOrders();
                $params = [
                    'new_orders_count' => $newOrders->count,
                    'pending_orders_count' => $pendingOrders->count
                ];
                return view('administration.lte-dashboard', $params);
            }
        }
        return redirect('administration/login');
    }
}
