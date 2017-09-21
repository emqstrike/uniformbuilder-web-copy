<?php

namespace App\Traits;

use Log;
use Session;
use MiladRahimi\PhpCrypt\Crypt as TeamStorePasswordCrypt;

trait HandleTeamStoreConfiguration
{
    public function handleTeamStoreLogin(
        $response,
        $user = null,
        $access_token = null
    )
    {
        if ($response->success)
        {
            Log::info("User's Team Store Account ID: " . $response->team_store_user_id);
            // Team Store Session - Entry point
            Session::put('userHasTeamStoreAccount', true);
            Session::put('team_store', [
                'id' => $response->team_store_id,
                'user_id' => $response->team_store_user_id,
                'code' => $response->team_store_code,
                'name' => $response->team_store_name,
                'colors' => $response->team_store_colors
            ]);
            Log::info('Session: userHasTeamStoreAccount = true');
            Log::info(print_r(Session::all(), true));
        }
        else
        {
            $key = env('TEAM_STORE_SECRET_KEY');

            $crypt = new TeamStorePasswordCrypt($key);
            $encrypted_password = $crypt->encrypt($password);

            $params = [
                'userId' => $result->user->id,
                'firstName' => $result->user->first_name,
                'lastName' => $result->user->last_name,
                'email' => $result->user->email,
                'accessToken' => base64_encode($result->access_token),
                'password' => $encrypted_password,
                'state' => $result->user->state,
                'zip' => $result->user->zip,
                'default_rep_id' => $result->user->default_rep_id,
            ];

            $teamstore_registration_params = base64_encode( json_encode($params) );
            Session::put('teamstore_registration_params', $teamstore_registration_params);
        }
    }
}