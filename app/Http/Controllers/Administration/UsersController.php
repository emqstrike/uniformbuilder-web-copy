<?php
namespace App\Http\Controllers\Administration;

use Crypt;
use Session;
use Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\SalesRepresentativesAPIClient;
use App\APIClients\UsersAPIClient as APIClient;

class UsersController extends Controller
{
    protected $client;
    protected $salesRepresentativesAPIClient;

    public function __construct(APIClient $apiClient, SalesRepresentativesAPIClient $salesRepresentativesAPIClient)
    {
        $this->client = $apiClient;
        $this->salesRepresentativesAPIClient = $salesRepresentativesAPIClient;
    }

    public function index()
    {
        $users = $this->client->getUsers();
        foreach($users as $user)
        {
            $user->created_at = date('M-d-Y', strtotime($user->created_at));
            if(isset($user->last_login)){
                $user->last_login = date('M-d-Y', strtotime($user->last_login));
            }
        }

        return view('administration.users.users', [
            'users' => $users
        ]);
    }

    public function editUserForm($id)
    {
        $user = $this->client->getUser($id);
        $sales_reps = $this->salesRepresentativesAPIClient->getSalesReps();
        return view('administration.users.user-edit', [
            'user' => $user,
            'sales_reps' => $sales_reps            
        ]);
    }

    public function addUserForm()
    {
        $sales_reps = $this->salesRepresentativesAPIClient->getSalesReps();
        return view('administration.users.user-create', compact ('sales_reps'));
    }

    public function accountSettings($id)
    {
        $user = $this->client->getUser($id);
        return view('administration.users.account_settings', [
            'user' => $user
        ]);
    }

    public function changePassword(Request $request)
    {
        $id = $request->input('user_id');
        $newPassword = $request->input('new_password');
        $oldPassword = $request->input('old_password');

        $data = [
            'user_id' => $id,
            'new_password' => $newPassword,
            'old_password' => $oldPassword
        ];

        $response = $this->client->updatePassword($data);

        if ($response->success)
        {
            return Redirect::to('administration/account_settings/change_password/' . $id)
                            ->with('message', $response->message);
        }
        else
        {
            return Redirect::to('administration/account_settings/change_password/' . $id)
                            ->with('message', $response->message);
        }
    }

    public function changePasswordForm($id)
    {
        $user = $this->client->getUser($id);
        return view('administration.users.user-change-password', [
            'user' => $user
        ]);
    }

    public function store(Request $request)
    {
        $firstName = $request->input('first_name');
        $lastName = $request->input('last_name');
        $email = $request->input('email');
        $password = $request->input('password');
        $userCreateOrigin = $request->input('user_create_origin');
        $createdBy = $request->input('created_by');
        $role = $request->input('role');
        $data = [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'role' => $role
        ];

        $userId = null;
        if (!empty($request->input('user_id')))
        {
            $userId = $request->input('user_id');
            $data['id'] = $userId;
        }
        if (!empty($request->input('email')))
        {
            $data['email'] = $request->input('email');
        }
        if (!empty($request->input('password')))
        {
            $data['password'] = $request->input('password');
        }
        if (!empty($request->input('role')))
        {
            $data['role'] = $request->input('role');
        }
        if (!empty($request->input('user_create_origin')))
        {
            $data['user_create_origin'] = $request->input('user_create_origin');
        }
        if (!empty($request->input('created_by')))
        {
            $data['created_by'] = $request->input('created_by');
        }
        if (!empty($request->input('state')))
        {
            $data['state'] = $request->input('state');
        }
        if (!empty($request->input('zip')))
        {
            $data['zip'] = $request->input('zip');
        }
        if (!empty($request->input('default_rep_id')))
        {
            $data['default_rep_id'] = $request->input('default_rep_id');
        }

        // Does the User exist
        if ($this->client->isEmailTaken($email, $userId))
        {
            return Redirect::to('administration/users')
                            ->with('message', 'User email already exist');
        }

        if ($request->input('type'))
        {
            $data['type'] = $request->input('type');
        }

        $response = null;
        if (!empty($userId))
        {
            Log::info('Attempts to update User#' . $userId);
            $response = $this->client->updateUser($data);
        }
        else
        {

            $logData = $data;
            unset($logData['password']);
            Log::info('Attempts to create a new User ' . json_encode($logData));
            $response = $this->client->createUser($data);
        }

        if ($response->success)
        {
            Log::info('Save or Modify User: Success');
            return Redirect::to('/administration/users');
                            
            if (isset($data['id']))
            {
                if (Session::get('userId') == $data['id'])
                {
                    Session::put('fullname', $data["first_name"] . ' ' . $data["last_name"]);
                }
            }
            // return redirect()->back()
            //                 ->with('message', 'Successfully updated user information');
        }
        else
        {
            Log::info('Save or Modify User: Failed');
            return Redirect::to('/administration/users');
                            
            // return redirect()->back()
            //                 ->with('message', $response->message);
        }
    }

}