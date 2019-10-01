<?php
namespace App\Http\Controllers\Administration;

use \Session;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use GuzzleHttp\Exception\ClientException;
use App\APIClients\OrdersAPIClient;
use App\APIClients\UsersAPIClient;
use App\APIClients\SavedDesignsAPIClient;
// use Illuminate\Support\Facades\Redis;




class AdministrationController extends Controller
{
    protected $ordersClient;
    protected $savedDesignsClient;
    protected $usersClient;

    public function __construct(
        OrdersAPIClient $ordersAPIClient,
        SavedDesignsAPIClient $savedDesignAPIClient,
        UsersAPIClient $usersAPIClient
    )
    {
        $this->ordersClient = $ordersAPIClient;
        $this->savedDesignsClient = $savedDesignAPIClient;
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

    public function administrationDashboard()
    {
        if (Session::has('isLoggedIn'))
        {
            if (Session::get('isLoggedIn') == true)
            {
                return view('administration-lte-2.lte-main');
            }
        } else {
            return redirect('administration/login');
        }
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

                // Orders
                $saved_designs_stats_result = $this->savedDesignsClient->getStats($year);
                $saved_designs_stats = $this->initOneMonth();
                foreach ($saved_designs_stats_result as $saved_design)
                {
                    $saved_designs_stats[ $saved_design->month_number - 1 ] = $saved_design->saved_designs_count;
                }

                // Users
                $users_stats_result = $this->usersClient->getStats($year);
                $users_stats = $this->initOneMonth();
                foreach ($users_stats_result as $user)
                {
                    $users_stats[ $user->month_number - 1 ] = $user->users_count;
                }

                if (Session::get('role') == 'rep' && Session::get('userType') == 'administrator') {
                    return redirect('administration/v1-0');
                }

                return view('administration.lte-dashboard', compact(
                    'orders_stats',
                    'saved_designs_stats',
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
