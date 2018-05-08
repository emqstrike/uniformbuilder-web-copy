<?php
namespace App\Http\Controllers\AdministrationV2;

use Crypt;
use Session;
use Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\SalesRepresentativesAPIClient;
use App\APIClients\DealersAPIClient;
use App\APIClients\SavedDesignsAPIClient;
use App\APIClients\OrdersAPIClient;

use App\APIClients\UsersAPIClient as APIClient;

class UsersController extends Controller
{
    protected $client;
    protected $salesRepresentativesAPIClient;
    protected $dealersAPIClient;
    protected $savedDesignsAPIClient;
    protected $ordersAPIClientl;


    public function __construct(
        APIClient $apiClient,
        SalesRepresentativesAPIClient $salesRepresentativesAPIClient,
        DealersAPIClient $dealersAPIClient,
        SavedDesignsAPIClient $savedDesignsAPIClient,
        OrdersAPIClient $ordersAPIClient
    )
    {
        $this->client = $apiClient;
        $this->salesRepresentativesAPIClient = $salesRepresentativesAPIClient;
        $this->dealersAPIClient = $dealersAPIClient;
        $this->savedDesignsAPIClient = $savedDesignsAPIClient;
        $this->ordersAPIClient = $ordersAPIClient;
    }

    public function index()
    {
        if( Session::get('role') == "dev" ){
            $users = $this->client->getUsers();
            $users_string = json_encode($users);
            foreach($users as $user)
            {
                $user->created_at = date('M-d-Y', strtotime($user->created_at));
                if(isset($user->last_login)){
                    $user->last_login = date('M-d-Y', strtotime($user->last_login));
                }
            }
            return view('administration-lte-2.users.users', [
                'users' => $users,
                'users_string' => $users_string
            ]);
        } else {
            return redirect('administration-lte-2');
        }
    }
}
