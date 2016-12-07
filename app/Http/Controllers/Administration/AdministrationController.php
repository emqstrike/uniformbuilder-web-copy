<?php
namespace App\Http\Controllers\Administration;

use \Session;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use GuzzleHttp\Exception\ClientException;
use App\APIClients\OrdersAPIClient;
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
                // return view('administration.lte-dashboard');
                // $users =  Redis::get('users');
<<<<<<< HEAD
                $users = json_decode($users);
=======
                // $users = json_decode($users);
>>>>>>> cb9b9e16beadc29309e353ec83b512e69b4e2c51

                return view('administration.lte-dashboard', [
                    // 'users' => $users
                    // 'newOrdersCount' => $newOrdersCount,
                    // 'pendingOrdersCount' => $pendingOrdersCount
                    // 'newOrdersCount' => $newOrdersCount,
                    // 'pendingOrdersCount' => $pendingOrdersCount

                ]);
            }
        }
        return redirect('administration/login');
    }
}
