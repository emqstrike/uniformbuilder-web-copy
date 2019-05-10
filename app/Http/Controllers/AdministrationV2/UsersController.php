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
use ZxcvbnPhp\Zxcvbn;

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
        $users = $this->client->getUsers();
        $users_string = json_encode($users);

        foreach ($users as $user) {
            $user->created_at = date('M-d-Y', strtotime($user->created_at));

            if (isset($user->last_login)) {
                $user->last_login = date('M-d-Y', strtotime($user->last_login));
            }
        }

        $users = json_encode($users);

        return view('administration-lte-2.users.users', [
            'users' => $users,
            'users_string' => $users_string
        ]);
    }

    public function accountSettings($id)
    {
        $user = $this->client->getUser($id);
        return view('administration-lte-2.users.account_settings', [
            'user' => $user
        ]);
    }

    public function updateName(Request $request)
    {
        $firstName = $request->input('first_name');
        $lastName = $request->input('last_name');
        $data = [
            'first_name' => $firstName,
            'last_name' => $lastName
        ];

        $userId = null;
        if (!empty($request->input('user_id')))
        {
            $userId = $request->input('user_id');
            $data['id'] = $userId;
        }

        $response = null;
        if (!empty($userId))
        {
            Log::info('Attempts to update User#' . $userId);
            $response = $this->client->updateUser($data);
        }

        if ($response->success)
        {
            if (isset($data['id']))
            {
                if (Session::get('userId') == $data['id'])
                {
                    Session::put('fullname', $data["first_name"] . ' ' . $data["last_name"]);
            }
            }

            Log::info('Save or Modify User: Success');
            return Redirect::to('/administration/v1-0/account_settings/'.$userId)
                            ->with('message', 'Successfully updated user information');
        }
        else
        {
            Log::info('Save or Modify User: Failed');
            return Redirect::to('/administration/v1-0/account_settings/'.$userId)
                            ->with('message', $response->message);
        }
    }

    public function passwordStrength()
    {
        return view('administration-lte-2.users.users-password-strength');
    }

    public function userTransactions($id = null)
    {
        if ($id == null) {
            $id = 0;
        }
        $user = $this->client->getUser($id);
        $user_orders = $this->ordersAPIClient->getByUserId($id);
        $user_designs = $this->savedDesignsAPIClient->getByUserId($id);

        return view('administration-lte-2.users.users-transactions', [
            'user_orders' => $user_orders,
            'user_designs' => $user_designs,
            'user'  =>  $user
        ]);
    }

}
