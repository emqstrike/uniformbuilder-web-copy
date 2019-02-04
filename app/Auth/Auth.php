<?php

namespace App\Auth;

use App\APIClients\UsersAPIClient;
use App\ShoppingCart\User;
use GuzzleHttp\Exception\ClientException;

class Auth
{
    public static function check()
    {
        return !is_null(\Session::get('isLoggedIn')) ? \Session::get('isLoggedIn') : false;
    }

    public static function user()
    {
        if (static::check() && !is_null(\Session::get('userId')))
        {
            return User::find(\Session::get('userId'));
        }

        return null;
    }

    public static function loginUsingId($user_id, UsersAPIClient $apiClient)
    {
        $user = User::find($user_id);

        if (!is_null($user))
        {
            try {
                $data = [
                    'email' => $user->email,
                    'password' => $user->password,
                    'login_origin' => 'frontend'
                ];
                $result = $apiClient->login($data);

                if ($result->success) {
                    $auth_user = $result->user;
                    $fullname = $result->user->first_name . ' ' . $result->user->last_name;
                    $access_token = $result->access_token;

                    Session::put('userId', $auth_user->id);
                    Session::put('isLoggedIn', $result->success);
                    Session::put('fullname', $auth_user->getFullName());
                    Session::put('first_name', $auth_user->first_name);
                    Session::put('firstName', $auth_user->first_name);
                    Session::put('lastName', $auth_user->last_name);
                    Session::put('email', $auth_user->email);

                    Session::put('state', $auth_user->state);
                    Session::put('zip', $auth_user->zip);
                    Session::put('default_rep_id', $auth_user->default_rep_id);

                    Session::put('accountType', $auth_user->type);
                    Session::put('accessToken', $access_token);

                    Session::put('role', $auth_user->role);
                    Session::put('userType', $auth_user->type);
                    Session::put('userLimitedAccess', $auth_user->limited_access);
                    Session::put('userAllowedPages', $auth_user->allowed_pages);

                    // shopping cart
                    Auth::user()->generateNewLoggedInToken();
                    return true;
                }

                \Log::info('Failed Login Attempt by (' . $user->email . '): ' . $result->message);
                return false;
            }
            catch (ClientException $e)
            {
                \Log::error($e->getMessage());
            }
        }

        \Log::warning("User id {$user_id} is invalid");
        return false;
    }
}