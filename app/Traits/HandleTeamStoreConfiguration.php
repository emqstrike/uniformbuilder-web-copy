<?php

namespace App\Traits;

use Log;
use Session;
use App\Utilities\StringUtility;
use MiladRahimi\PhpCrypt\Crypt as TeamStorePasswordCrypt;

trait HandleTeamStoreConfiguration
{
    protected $config;

    protected function handleTeamStoreLogin(
        $response,
        $user = null,
        $access_token = null,
        $password = null
    )
    {
        if ($response->success)
        {
<<<<<<< HEAD
            if (config('app.debug')) Log::info("User's Team Store Account ID: " . $response->team_store_user_id);
=======
            // Log::info("User's Team Store Account ID: " . $response->team_store_user_id);
>>>>>>> elmer-merge-10-29-18-1435-cco-385-uniformbuilder

            // Team Store Session - Entry point
            $this->setTeamStoreConfiguration(
                $response->team_store_id,
                $response->team_store_user_id,
                $response->team_store_code,
                $response->team_store_name,
                $response->team_store_colors
            );

<<<<<<< HEAD
            if (config('app.debug')) Log::info('Session: userHasTeamStoreAccount = true');
            if (config('app.debug')) Log::info(print_r(Session::get('team_store'), true));
=======
            // Log::info('Session: userHasTeamStoreAccount = true');
            // Log::info(print_r(Session::get('team_store'), true));
>>>>>>> elmer-merge-10-29-18-1435-cco-385-uniformbuilder
        }
        else
        {
            $key = env('TEAM_STORE_SECRET_KEY');

            $crypt = new TeamStorePasswordCrypt($key);
            $encrypted_password = $crypt->encrypt($password);

            if (!is_null($user))
            {
                $params = [
                    'userId' => $user->id,
                    'firstName' => $user->first_name,
                    'lastName' => $user->last_name,
                    'email' => $user->email,
                    'accessToken' => base64_encode($access_token),
                    'password' => $encrypted_password,
                    'state' => $user->state,
                    'zip' => $user->zip,
                    'default_rep_id' => $user->default_rep_id,
                ];

                $this->setTeamStoreRegistrationParams($params);
            }
        }
    }

    protected function setTeamStoreConfiguration(
        $store_id,
        $user_id,
        $store_code,
        $store_name,
        $colors
    )
    {
        Session::put('userHasTeamStoreAccount', true);
        Session::put('team_store', [
            'id' => $store_id,
            'user_id' => $user_id,
            'code' => $store_code,
            'name' => $store_name,
            'colors' => $colors
        ]);
    }

    /**
     * Retrieve user credential
     * @param  String $encoded_data
     * @return String or null
     */
    protected function retrieveCredentials($encoded_data)
    {
        $decoded = base64_decode($encoded_data);
        $data = json_decode($decoded);
        if (!empty($data))
        {
            $key = env('TEAM_STORE_SECRET_KEY');

            $crypt = new TeamStorePasswordCrypt($key);
            return $crypt->decrypt($data->password);
        }

        return null;
    }

    protected function handleConfiguration(&$params = [], $config = [])
    {
        $this->config = $config;

        // @param Store Code
        $params['store_code'] = $this->getTeamStoreCodeFromConfig();
        if (empty($params['store_code']))
        {
            $params['store_code'] = $this->getTeamStoreCodeFromSession();
        }
<<<<<<< HEAD
        if (config('app.debug')) Log::info('STORE CODE: ' . $params['store_code']);
=======
        // Log::info('STORE CODE: ' . $params['store_code']);
>>>>>>> elmer-merge-10-29-18-1435-cco-385-uniformbuilder

        // @param Team Store USER ID
        $params['team_store_user_id'] = $this->getTeamStoreUserId();

        // @param Team Name
        $params['team_name'] = '';
        if (isset($config['team_name']))
        {
            $params['team_name'] = $config['team_name'];
<<<<<<< HEAD
            if (config('app.debug')) Log::info(__METHOD__ . ': Team Name = ' . $params['team_name']);
=======
            // Log::info(__METHOD__ . ': Team Name = ' . $params['team_name']);
>>>>>>> elmer-merge-10-29-18-1435-cco-385-uniformbuilder
        }

        // @param Team Colors - comma separated list
        $params['team_colors'] = null;
        $params['csv_team_colors'] = null;
        if (isset($config['team_colors']))
        {
            $params['csv_team_colors'] = $config['team_colors'];
            $color_array = StringUtility::strToArray($config['team_colors']);
            $color_array = StringUtility::surroundElementsDQ($color_array);
            $params['team_colors'] = implode(',', $color_array);
<<<<<<< HEAD
            if (config('app.debug')) Log::info(__METHOD__ . ': Team Colors = ' . $params['team_colors']);
=======
            // Log::info(__METHOD__ . ': Team Colors = ' . $params['team_colors']);
>>>>>>> elmer-merge-10-29-18-1435-cco-385-uniformbuilder
        }

        // @param Jersey Name
        $params['jersey_name'] = '';
        if (isset($config['jersey_name']))
        {
            $params['jersey_name'] = $config['jersey_name'];
<<<<<<< HEAD
            if (config('app.debug')) Log::info(__METHOD__ . ': Jersey Name = ' . $params['jersey_name']);
=======
            // Log::info(__METHOD__ . ': Jersey Name = ' . $params['jersey_name']);
>>>>>>> elmer-merge-10-29-18-1435-cco-385-uniformbuilder
        }

        // @param Jersey Number
        $params['jersey_number'] = '';
        if (isset($config['jersey_number']))
        {
            $params['jersey_number'] = $config['jersey_number'];
<<<<<<< HEAD
            if (config('app.debug')) Log::info(__METHOD__ . ': Jersey Number = ' . $params['jersey_number']);
=======
            // Log::info(__METHOD__ . ': Jersey Number = ' . $params['jersey_number']);
>>>>>>> elmer-merge-10-29-18-1435-cco-385-uniformbuilder
        }

        // @param Mascot ID
        $params['mascot_id'] = '';
        if (isset($config['mascot_id']))
        {
            $params['mascot_id'] = $config['mascot_id'];
<<<<<<< HEAD
            if (config('app.debug')) Log::info(__METHOD__ . ': Mascot ID = ' . $params['mascot_id']);
=======
            // Log::info(__METHOD__ . ': Mascot ID = ' . $params['mascot_id']);
>>>>>>> elmer-merge-10-29-18-1435-cco-385-uniformbuilder
        }

        // @param Save Rendered image
        $params['save_rendered'] = '';
        if (isset($config['save_rendered']))
        {
            $params['save_rendered'] = $config['save_rendered'];
            if (!empty($config['save_rendered']))
            {
<<<<<<< HEAD
                if (config('app.debug')) Log::info(__METHOD__ . ': Save Rendered Image = ' . $params['save_rendered']);
=======
                // Log::info(__METHOD__ . ': Save Rendered Image = ' . $params['save_rendered']);
>>>>>>> elmer-merge-10-29-18-1435-cco-385-uniformbuilder
            }
        }

        // @param Save Rendered image
        $params['save_rendered_timeout'] = null;
        if (isset($config['save_rendered_timeout']))
        {
            $params['save_rendered_timeout'] = $config['save_rendered_timeout'];
            if (!empty($params['save_rendered_timeout']))
            {
<<<<<<< HEAD
                if (config('app.debug')) Log::info(__METHOD__ . ': Seconds timeout before rendering = ' . $params['save_rendered_timeout']);
=======
                // Log::info(__METHOD__ . ': Seconds timeout before rendering = ' . $params['save_rendered_timeout']);
>>>>>>> elmer-merge-10-29-18-1435-cco-385-uniformbuilder
            }
        }

        // @param Team Store Product ID
        $params['product_id'] = null;
        if (isset($config['product_id']))
        {
            $params['product_id'] = $config['product_id'];
<<<<<<< HEAD
            if (config('app.debug')) Log::info(__METHOD__ . ': Team Store Product ID = ' . $params['product_id']);
=======
            // Log::info(__METHOD__ . ': Team Store Product ID = ' . $params['product_id']);
>>>>>>> elmer-merge-10-29-18-1435-cco-385-uniformbuilder
        }

        $params['teamstore_registration_params'] = $this->getTeamStoreRegistrationParams();
        if (!empty($params['teamstore_registration_params']))
        {
<<<<<<< HEAD
            if (config('app.debug')) Log::info(__METHOD__ . ': Team Store Registration Parameters = ' . $params['teamstore_registration_params']);
=======
            // Log::info(__METHOD__ . ': Team Store Registration Parameters = ' . $params['teamstore_registration_params']);
>>>>>>> elmer-merge-10-29-18-1435-cco-385-uniformbuilder
        }
    }

    public function setTeamStoreRegistrationParams($params)
    {
        $teamstore_registration_params = base64_encode( json_encode($params) );
        Session::put('teamstore_registration_params', $teamstore_registration_params);
    }

    public function getTeamStoreRegistrationParams()
    {
        if (Session::has('teamstore_registration_params'))
        {
            return Session::get('teamstore_registration_params');
        }
        return null;
    }

    protected function getTeamStore()
    {
        if (Session::has('team_store'))
        {
            return Session::get('team_store');
        }
        return null;
    }

    protected function getTeamStoreCodeFromConfig()
    {
        if (isset($this->config['store_code']))
        {
            return $this->config['store_code'];
        }
        return null;
    }

    protected function getTeamStoreCodeFromSession()
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