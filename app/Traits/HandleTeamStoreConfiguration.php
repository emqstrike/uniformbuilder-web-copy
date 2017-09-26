<?php

namespace App\Traits;

use Log;
use Session;
use App\Utilities\StringUtility;
use MiladRahimi\PhpCrypt\Crypt as TeamStorePasswordCrypt;

trait HandleTeamStoreConfiguration
{
    protected function handleTeamStoreLogin(
        $response,
        $user = null,
        $access_token = null,
        $password = null
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
            Log::info(print_r(Session::get('team_store'), true));
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

    protected function getTeamStore()
    {
        if (Session::has('team_store'))
        {
            return Session::get('team_store');
        }
        return null;
    }

    protected function getTeamStoreCode()
    {
        $team_store = $this->getTeamStore();
        if (!is_null($team_store))
        {
            if (isset($team_store['code']))
            {
                return $team_store['code'];
            }
        }
        return null;
    }

    protected function getTeamStoreUserId()
    {
        $team_store = $this->getTeamStore();
        if (!is_null($team_store))
        {
            if (isset($team_store['user_id']))
            {
                return $team_store['user_id'];
            }
        }
        return null;
    }

    protected function getTeamStoreName()
    {
        $team_store = $this->getTeamStore();
        if (!is_null($team_store))
        {
            if (isset($team_store['name']))
            {
                return $team_store['name'];
            }
        }
        return null;
    }

    protected function getTeamStoreColors($is_encode = true)
    {
        $team_store = $this->getTeamStore();
        if (!is_null($team_store))
        {
            if (isset($team_store['colors']))
            {
                if ($is_encode)
                {
                    $colors = StringUtility::surroundElementsDQ($team_store['colors']);
                    return implode(',', $colors);
                }
                return $team_store['colors'];
            }
        }
        return null;
    }
}