<?php

namespace App\Http\Controllers\Administration;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use \GuzzleHttp\Client;

class AuthenticationController extends Controller
{
    public function login()
    {
        $client = new Client();
        $response = $client->get($this->apiHost . 'login');
    }

    public function loginForm()
    {
        return view('administration.auth.login');
    }
}
