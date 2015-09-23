<?php

namespace App\Http\Controllers;

use Session;
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
                Session::put('userId', $result->user->id);
                Session::put('isLoggedIn', $result->success);
                Session::put('fullname', $result->user->first_name . ' ' . $result->user->last_name);
                Session::put('email', $result->user->email);
                Session::put('accountType', $result->user->type);
                Session::put('accessToken', $result->access_token);
                Session::flash('flash_message', 'Welcome to QuickStrike Uniform Builder');

                return redirect('/uniform-builder-index');
            }
            else
            {
                Session::flash('flash_message', $result->message);
            }

        }
        catch (ClientException $e)
        {
            $error = $e->getMessage();
            Log::info('Login Attempt Error : ' . $error);
        }

        return redirect('/uniform-builder-index');
    }

    public function logout()
    {
        $this->clearLoginSession();
        Log::info('User Logout');
        return redirect('/uniform-builder-index');
    }
}
