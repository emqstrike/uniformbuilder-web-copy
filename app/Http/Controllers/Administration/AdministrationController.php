<?php

namespace App\Http\Controllers\Administration;

use \Session;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use GuzzleHttp\Exception\ClientException;
use App\APIClients\OrdersAPIClient;
use App\APIClients\UsersAPIClient;
// use Illuminate\Support\Facades\Redis;




class AdministrationController extends Controller
{
    protected $ordersClient;

    public function __construct(
        OrdersAPIClient $ordersAPIClient,
        UsersAPIClient $usersAPIClient
    )
    {
        $this->ordersClient = $ordersAPIClient;
        $this->usersClient = $usersAPIClient;
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

    private function initOneMonth()
    {
        return [0,0,0,0,0,0,0,0,0,0,0,0];
    }

    public function dashboard()
    {
        try
        {
            // $orders = $this->ordersClient->countNewOrders();
            if(isset($orders)){
                // $newOrdersCount = $orders->count;
                // $pendingOrders = $this->ordersClient->countPendingOrders();
                // $pendingOrdersCount = $pendingOrders->count;
            }
        } catch (QueryException $e) {
            // $error = $e->getMessage();
        } catch (Exception $e) {
            // $error = $e->getMessage();
        }

        if (Session::has('isLoggedIn'))
        {
            if (Session::get('isLoggedIn') == true)
            {
                $year = date('Y');

                // Orders
                $orders_stats_result = $this->ordersClient->getStats($year);
                $orders_stats = $this->initOneMonth();
                foreach ($orders_stats_result as $order)
                {
                    $orders_stats[ $order->month_number - 1 ] = $order->orders_count;
                }

                // Users
                $users_stats_result = $this->usersClient->getStats($year);
                $users_stats = $this->initOneMonth();
                foreach ($users_stats_result as $user)
                {
                    $users_stats[ $user->month_number - 1 ] = $user->users_count;
                }

                return view('administration.lte-dashboard', compact(
                    'orders_stats',
                    'users_stats'
                ));
                // if(Session::get('adminFullAccess')){
                    // return view('administration.lte-dashboard');
                // } else {
                //     return redirect('administration/saved_designs');
                // }
                // $users =  Redis::get('users');
                // $users = json_decode($users);

                // return view('administration.lte-dashboard', [
                //     'users' => $users
                //     // 'newOrdersCount' => $newOrdersCount,
                //     // 'pendingOrdersCount' => $pendingOrdersCount
                //     // 'newOrdersCount' => $newOrdersCount,
                //     // 'pendingOrdersCount' => $pendingOrdersCount

                // ]);
            }
        }
        return redirect('administration/login');
    }
}
