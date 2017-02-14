<?php
namespace Customizer\Http\Controllers\Administration;

use \Session;
use Customizer\Http\Requests;
use Illuminate\Http\Request;
use Customizer\Http\Controllers\Controller;
use GuzzleHttp\Exception\ClientException;
use Customizer\APIClients\OrdersAPIClient;
// use Illuminate\Support\Facades\Redis;




class AdministrationController extends Controller
{
    protected $ordersClient;

    public function __construct(
        OrdersAPIClient $ordersAPIClient
    )
    {
        $this->ordersClient = $ordersAPIClient;
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
                // if(Session::get('adminFullAccess')){
                    return view('administration.lte-dashboard');
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
