<?php

namespace App\Http\Controllers;

use App\APIClients\UsersAPIClient as APIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\TeamStoreClient\UserTeamStoreClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class TeamStoreController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function create()
    {
        $user = $this->client->getUser(Session::get('userId'));

        $params = [
            'page_title' => env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'material_id' => -1,
            'category_id' => -1,
            'builder_customizations' => null,
            'page' => 'my-profile',
            'user' => $user
        ];

        return view('teamstore.create', $params);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'store_name'         => 'required|min:6',
            'team_name'          => 'required|min:6',
            'sport'              => 'required',
            'organization'       => 'required',
            'role'               => 'required',
            'password'           => 'required',
            'retype_password'    => 'required|same:password'
        ]);

        $response = (new UserTeamStoreClient())->createStore($request);
        
        if ($response->success) {
            return redirect(env('TEAM_STORE_REMOTE_LOGIN_URL') . '/' . Session::get('userId') . '/' . Session::get('accessToken'));
        }

        return back();
    }
}
