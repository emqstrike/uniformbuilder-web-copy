<?php
namespace App\Http\Controllers;

use App\APIClients\UsersAPIClient as APIClient;
use App\Auth\Auth;
use App\Http\Controllers\Administration\AuthenticationController as AdminAuthController;
use App\ShoppingCart\User;
use App\TeamStoreClient\UserTeamStoreClient;
use App\Traits\HandleTeamStoreConfiguration;
use App\Utilities\Crypt;
use App\Utilities\Log;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;
use MiladRahimi\PhpCrypt\Crypt as TeamStorePasswordCrypt;
use Redirect;
use Session;
use Webmozart\Json\JsonDecoder;
use \Exception;

class AuthenticationController extends AdminAuthController
{
    use HandleTeamStoreConfiguration;

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
            $data = [
                'email' => $email,
                'password' => $password,
                'login_origin' => 'frontend'
            ];
            $result = $this->client->login($data);

            if ($result->success) {
                $fullname = $result->user->first_name . ' ' . $result->user->last_name;
                $access_token = $result->access_token;
                $user = $result->user;

                Session::put('userId', $user->id);
                Session::put('isLoggedIn', $result->success);
                Session::put('fullname', $fullname);
                Session::put('first_name', $user->first_name);
                Session::put('firstName', $user->first_name);
                Session::put('lastName', $user->last_name);
                Session::put('email', $user->email);

                Session::put('state', $user->state);
                Session::put('zip', $user->zip);
                Session::put('default_rep_id', $user->default_rep_id);

                Session::put('accountType', $user->type);
                Session::put('accessToken', $access_token);

                Session::put('role', $user->role);
                Session::put('userType', $user->type);
                Session::put('userLimitedAccess', $user->limited_access);
                Session::put('userAllowedPages', $user->allowed_pages);

                Session::flash('flash_message', 'Welcome to QuickStrike Uniform Builder');

                // shopping cart
                Auth::user()->generateNewLoggedInToken();

                #
                # TEAM STORE LOGIN HANDLER
                #
                $decoder = new JsonDecoder();
                $response = $this->client->get('get_feature_by_name/' . config('teamstores.feature_name'));
                $response = $decoder->decode($response->getBody());

                if (filter_var($response->feature->active, FILTER_VALIDATE_BOOLEAN)) {
                    if ($response->feature->switch == 'enable') {
                        $user_ids = str_replace('"', '', $response->feature->user_ids);
                        $user_ids = str_replace('"', '', substr($user_ids, 1, -1));

                        if ($user_ids) {
                            $user_ids = explode(",", $user_ids);
                        } else {
                            $user_ids = [];
                        }

                        if ((in_array($result->user->id, $user_ids)) || (count($user_ids) == 0)) {
                            Session::put('teamStoreFeatureIsEnabled', true);

                            $allowed_users = [
                                'administrator'
                            ];

                            if (in_array($result->user->type, $allowed_users)) {
                                Session::put('is_show_teamstore_toolbox', true);
                                Log::info('User #' . $user->email . ' (' . $user->type . ') is entitled to open TEAM STORE (beta) version');

                                $client = new UserTeamStoreClient;
                                $response = $client->get_store_by_token($access_token);

                                if ($response->success) {
                                    $this->setTeamStoreConfiguration(
                                        $response->store->store_id,
                                        $response->store->owner_id,
                                        $response->store->store_code,
                                        $response->store->store_name,
                                        $response->store->colors
                                    );
                                }
                            }
                        }
                    }
                }



                #
                # CUSTOMIZER LOGIN HANDLER
                #
                return [
                    'success' => true,
                    'message' => 'Welcome back ' . $user->first_name,
                    'userId' => $user->id,
                    'firstName' => $user->first_name,
                    'lastName' => $user->last_name,
                    'fullname' => $fullname,
                    'email' => $user->email,
                    'accountType' => $user->type,
                    'default_rep_id' => $user->default_rep_id,
                    'state' => $user->state,
                    'zip' => $user->zip,
                    'accessToken' => base64_encode($access_token),
                    'logged_in_token' => Auth::user()->logged_in_token
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

    public function remoteLogin($token = null)
    {
        if (empty($token))
        {
            Log::info('Empty login access_token');
            return Redirect::to('/index')->with('message', "Invalid login credentials.");
        }

        $key = env('TEAM_STORE_SECRET_KEY');
        $crypt = new TeamStorePasswordCrypt($key);
        $decoded = base64_decode($token);
        $json_data = $crypt->decrypt($decoded);
        $params = json_decode($json_data);

        if (isset($params->user_id)) Log::info('user_id=' . $params->user_id);
        if (isset($params->user_email)) Log::info('user_email=' . $params->user_email);
        if (isset($params->access_token)) Log::info('access_token=' . $params->access_token);
        if (isset($params->store_id)) Log::info('store_id=' . $params->store_id);
        if (isset($params->store_name)) Log::info('store_name=' . $params->store_name);
        if (isset($params->colors)) Log::info('colors=' . $params->colors);

        try {
            if (isset($params->access_token))
            {
                $response = $this->client->get("user/remote-login/{$params->access_token}");

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

                    #
                    # TEAM STORE LOGIN HANDLER
                    #
                    $allowed_users = [
                        'administrator'
                    ];
                    if (in_array($result->user->type, $allowed_users))
                    {
                        Session::put('is_show_teamstore_toolbox', true);
                        Log::info('User #' . $result->user->email . ' (' . $result->user->type . ') is entitled to open TEAM STORE (beta) version');

                        Session::put('userHasTeamStoreAccount', true);
                        $this->setTeamStoreConfiguration(
                            $params->store_id,
                            $params->user_id,
                            $params->store_code,
                            $params->store_name,
                            $params->colors
                        );
                    }
                    return Redirect::to('/index')->with('message', 'Welcome back ' . $fullname);

                } else {
                    Session::flash('flash_message', $result->message);
                }
            }

        } catch (ClientException $e) {
            $error = $e->getMessage();
            Log::info('Login Attempt Error : ' . $error, 'FRONT END');
        } catch (Exception $e) {
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
