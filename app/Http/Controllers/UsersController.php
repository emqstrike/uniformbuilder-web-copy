<?php

namespace App\Http\Controllers;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\APIClient;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UsersController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $users = $this->client->getUser();

        return view('administration.users.users', [
            'users' => $users,
            'api_host' => env('API_HOST')
        ]);
    }

    public function editUserForm($id)
    {
        $user = $this->client->getUser($id);
        return view('administration.users.user-edit', [
            'user' => $user
        ]);
    }

    public function addUserForm()
    {
        return view('administration.users.user-create');
    }

    public function store(Request $request)
    {
        $firstName = $request->input('first_name');
        $lastName = $request->input('last_name');
        $email = $request->input('email');
        $password = $request->input('password');

        $userId = null;
        if (!empty($request->input('user_id')))
        {
            $userId = $request->input('user_id');
        }

        // Does the User exist
        if ($this->client->isUserExist($email, $userId))
        {
            return Redirect::to('administration/users')
                            ->with('message', 'User email already exist');
        }

        $data = [
            'id' => $userId,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'password' => $password
        ];

        $response = null;
        if (!empty($userId))
        {
            $response = $this->client->updateUser($data);
        }
        else
        {
            $response = $this->client->createUser($data);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
