<?php

namespace App\Http\Controllers;

use Session;
use Redirect;
use App\Utilities\Log;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use GuzzleHttp\Exception\ClientException;
use App\APIClients\UsersAPIClient as APIClient;
use App\Http\Controllers\Administration\AuthenticationController as AdminAuthController;

class AuthenticationController extends AdminAuthController
{
    /**
     * Front-end Login
     */
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        try
        {
            $response = $this->client->post('user/login', [
                'json' => [
                    'email' => $email,
                    'password' => $password
                ]
            ]);
            $decoder = new JsonDecoder();
            $result = $decoder->decode($response->getBody());

            if ($result->success)
            {
                $fullname = $result->user->first_name . ' ' . $result->user->last_name;
                Session::put('userId', $result->user->id);
                Session::put('isLoggedIn', $result->success);
                Session::put('fullname', $fullname);
                Session::put('first_name', $result->user->first_name);
                Session::put('email', $result->user->email);
                Session::put('accountType', $result->user->type);
                Session::put('accessToken', $result->access_token);
                Session::flash('flash_message', 'Welcome to QuickStrike Uniform Builder');

                Log::info('Successful User Login', 'FRONT END');
                return Redirect::to('/index')
                                ->with('message', 'Welcome back ' . $fullname);
            }
            else
            {
                Session::flash('flash_message', $result->message);
            }

        }
        catch (ClientException $e)
        {
            $error = $e->getMessage();
            Log::info('Login Attempt Error : ' . $error, 'FRONT END');
        }

        return Redirect::to('/index')
                        ->with('message', 'Login failed.');
    }

    public function logout()
    {
        $this->clearLoginSession();
        Log::info('User Logout', 'FRONT END');
        return Redirect::to('/index')
                        ->with('message', 'You have been logged out.');
    }
}
