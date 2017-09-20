<?php
namespace App\Http\Controllers;

use App\APIClients\UsersAPIClient as APIClient;
use App\Http\Controllers\Administration\AuthenticationController as AdminAuthController;
use App\TeamStoreClient\UserTeamStoreClient;
use App\Utilities\Crypt;
use App\Utilities\Log;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;
use Redirect;
use Session;
use \Exception;
use Webmozart\Json\JsonDecoder;
use MiladRahimi\PhpCrypt\Crypt as TeamStorePasswordCrypt;

class AuthenticationController extends AdminAuthController
{
    /**
     * Front-end Login
     */
    public function login(Request $request)
    {
        $rep_emails_raw = env('REP_EMAILS');
        $rep_emails = explode(",", $rep_emails_raw);

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

            if ($result->success) {

                $fullname = $result->user->first_name . ' ' . $result->user->last_name;
                Session::put('userId', $result->user->id);
                Session::put('isLoggedIn', $result->success);
                Session::put('fullname', $fullname);
                Session::put('first_name', $result->user->first_name);
                Session::put('firstName', $result->user->first_name);
                Session::put('lastName', $result->user->last_name);
                Session::put('email', $result->user->email);
                Session::put('accountType', $result->user->type);
                Session::put('accessToken', base64_encode($result->access_token));
                Session::flash('flash_message', 'Welcome to QuickStrike Uniform Builder');

                Log::info('Successful User Login', 'FRONT END');
                return Redirect::to('/index')
                                ->with('message', 'Welcome back ' . $fullname);

            } else {

                Log::info('Failed Login Attempt by (' . $email . '): ' . $result->message);
                Session::flash('flash_message', $result->message);

            }

        }
        catch (ClientException $e)
        {
            $error = $e->getMessage();
            Log::info('Login Attempt Error : ' . $error, 'FRONT END');
        }
        catch (RequestException $e)
        {
            $error = $e->getMessage();
            Log::info('Login Attempt Error : ' . $error, 'FRONT END');
        }
        catch (Exception $e)
        {
            $error = $e->getMessage();
            Log::info('Login Attempt Error : ' . $error, 'FRONT END');
        }

        return Redirect::to('/index')
                        ->with('message', "The email and password you entered don't match.");
    }

    public function lrest(Request $request)
    {

        $email = $request->input('email');
        $password = $request->input('password');

        if (strlen (trim($email)) == 0 || strlen (trim($password)) == 0)
        {
            return [
                'sucess' => false, 
                'message' => 'Invalid Email / Password Combination',
            ];
        } 

        try {

            $response = $this->client->post('user/login', [
                'json' => [
                    'email' => $email,
                    'password' => $password
                ],
            ]);

            $decoder = new JsonDecoder();
            $result = $decoder->decode($response->getBody());

            if ($result->success) {
                $fullname = $result->user->first_name . ' ' . $result->user->last_name;

                Session::put('userId', $result->user->id);
                Session::put('isLoggedIn', $result->success);
                Session::put('fullname', $fullname);
                Session::put('first_name', $result->user->first_name);
                Session::put('firstName', $result->user->first_name);
                Session::put('lastName', $result->user->last_name);
                Session::put('email', $result->user->email);

                Session::put('state', $result->user->state);
                Session::put('zip', $result->user->zip);
                Session::put('default_rep_id', $result->user->default_rep_id);

                Session::put('accountType', $result->user->type);
                Session::put('accessToken', $result->access_token);
                Session::flash('flash_message', 'Welcome to QuickStrike Uniform Builder');

                #
                # TEAM STORE LOGIN HANDLER
                #

                $teamstore_is_beta = config('teamstores.is_beta');

                if ($teamstore_is_beta)
                {

                    Log::info('TEAM STORE is in BETA');

                    /**
                     * For this BETA launch - August 1, 2017. We have restricted access to some users only
                     */

                    $allowed_users = [
                        'administrator',
                        'dealer'
                    ];
                    if (in_array($result->user->type, $allowed_users))
                    {
                        Session::put('is_show_teamstore_toolbox', true);
                        Log::info('User #' . $result->user->email . ' (' . $result->user->type . ') is entitled to open TEAM STORE (beta) version');

                        $client = new UserTeamStoreClient;
                        $response = $client->team_store_login($email, $password);

                        if ($response->success)
                        {
                            Log::info("User's Team Store Account ID: " . $response->team_store_user_id);
                            // Team Store Session - Entry point
                            Session::put('userHasTeamStoreAccount', true);
                            Log::info('Session: userHasTeamStoreAccount = true');
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

                #
                # CUSTOMIZER LOGIN HANDLER
                #
                return [
                    'success' => true, 
                    'message' => 'Welcome back ' . $result->user->first_name,
                    'userId' => $result->user->id,
                    'firstName' => $result->user->first_name,
                    'lastName' => $result->user->last_name,
                    'fullname' => $fullname,
                    'email' => $result->user->email,
                    'accountType' => $result->user->type,
                    'default_rep_id' => $result->user->default_rep_id,
                    'state' => $result->user->state,
                    'zip' => $result->user->zip,

                    'accessToken' => base64_encode($result->access_token),
                ];

            } else {

                Log::info('Failed Login Attempt by (' . $email . '): ' . $result->message);
                // Session::flash('flash_message', $result->message);

                return [

                    'sucess' => false, 
                    'message' => 'Invalid Email / Password Combination',

                ];

            }

        }
        catch (ClientException $e)
        {
            return [

                'sucess' => false, 
                'message' => 'Invalid Email / Password',

            ];
        }

        return [

            'sucess' => false, 
            'message' => 'Invalid Email / Password',

        ];

    }

    public function remoteLogin($id, $accessToken)
    {
        try {
            $response = $this->client->get("user/remote-login/{$id}/{$accessToken}");

            $decoder = new JsonDecoder();
            $result = $decoder->decode($response->getBody());

            if ($result->success) {
                $fullname = $result->user->first_name . ' ' . $result->user->last_name;

                Session::put('userId', $result->user->id);
                Session::put('isLoggedIn', $result->success);
                Session::put('fullname', $fullname);
                Session::put('first_name', $result->user->first_name);
                Session::put('firstName', $result->user->first_name);
                Session::put('lastName', $result->user->last_name);
                Session::put('email', $result->user->email);
                Session::put('accountType', $result->user->type);
                Session::put('accessToken', $result->access_token);

                Session::flash('flash_message', 'Welcome to QuickStrike Uniform Builder');

                $response = (new UserTeamStoreClient())->hasTeamStoreAccount($result->user->id);

                if ($response->success) {
                    Session::put('userHasTeamStoreAccount', true);
                }

                return Redirect::to('/index')->with('message', 'Welcome back ' . $fullname);

            } else {
                Session::flash('flash_message', $result->message);
            }

        } catch (ClientException $e) {
            $error = $e->getMessage();
            Log::info('Login Attempt Error : ' . $error, 'FRONT END');
        }

        return Redirect::to('/index')
                        ->with('message', "The email and password you entered don't match.");
    }

    public function logout()
    {
        $this->clearLoginSession();
        Log::info('User Logout', 'FRONT END');
        return Redirect::to('/index')
                        ->with('message', 'You have been logged out.');
    }

    public function forgotPasswordForm()
    {
        $params = [
            'page_title' => 'Forgot your password? | ' . env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE')
        ];
        return view('forms.forgot-password', $params);
    }

    public function recoverPassword(Request $request)
    {
        $email = $request->input('email');
        return $this->client->recoverPassword($email);
    }

    public function resetPasswordForm($hash)
    {

        $response = $this->client->getUserFromHash($hash);
        if ($response['success'])
        {
            $user = $response['user'];
            $params = [
                'page_title' => 'Reset your password | ' . env('APP_TITLE'),
                'app_title' => env('APP_TITLE'),
                'asset_version' => env('ASSET_VERSION'),
                'asset_storage' => env('ASSET_STORAGE'),
                'full_name' => $user->first_name . ' ' . $user->last_name,
                'email' => $user->email,
                'hash' => $user->password_reset_hash,
                'user_id' => $user->id,
                'material_id' => -1,
                'category_id' => -1,
                'builder_customizations' => null,
                'page' => 'reset-password'
            ];
            return view('forms.reset-password', $params);
        }

        // Redirect to forgot-password
        return Redirect::to('/forgotPassword')
                        ->with('message', 'Invalid password reset token.');
    }

    public function saveNewPassword(Request $request)
    {
        $data = [
            'user_id' => $request->input('user_id'),
            'password' => $request->input('password'),
            'hash' => $request->input('hash')
        ];

        return $this->client->saveNewPassword($data);
    }

    public function changePasswordForm()
    {
        $params = [
            'page_title' => 'Forgot your password? | ' . env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'user_id' => Session::get('userId'),
            'material_id' => -1,
            'category_id' => -1,
            'builder_customizations' => null,
            'page' => 'reset-password'
        ];

        return view('forms.change-password', $params);
    }

    public function saveChangedPassword(Request $request)
    {
        $userId = $request->input('user_id');
        $oldPassword = $request->input('old_password');
        $newPassword = $request->input('new_password');

        $response = $this->client->updatePassword([
            'user_id' => $userId,
            'old_password' => $oldPassword,
            'new_password' => $newPassword
        ]);

        return (array) $response;
    }
}
