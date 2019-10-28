<?php
namespace App\Http\Controllers\Administration;

use Session;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;
use GuzzleHttp\Exception\ClientException;
use App\APIClients\UsersAPIClient as APIClient;

class AuthenticationController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    /**
     * Administration Login
     */
    public function administrationLogin(Request $request)
    {
        $rep_emails_raw = env('REP_EMAILS');
        $rep_emails = explode(",", $rep_emails_raw);

        $email = $request->input('email');
        $password = $request->input('password');
        if (in_array($email, $rep_emails)) {
            Session::put('adminFullAccess', false);
        } else {
            Session::put('adminFullAccess', true);
        }

        try
        {
            $data = [
                'email' => $email,
                'password' => $password,
                'login_origin' => 'backend',
                'brand_id' => env('BRAND_ID')
            ];

            $result = $this->client->login($data);

            // Only 'administrator' Account Type can login
            if ($result->success && $result->user->type == 'administrator')
            {
                Session::put('userId', $result->user->id);
                Session::put('userAllowedPages', $result->user->allowed_pages);
                Session::put('isLoggedIn', $result->success);
                Session::put('fullname', $result->user->first_name . ' ' . $result->user->last_name);
                Session::put('first_name', $result->user->first_name);
                Session::put('firstName', $result->user->first_name);
                Session::put('lastName', $result->user->last_name);
                Session::put('email', $result->user->email);
                Session::put('accountType', $result->user->type);
                Session::put('accessToken', $result->access_token);
                Session::put('role', $result->user->role);
                Session::put('userType', $result->user->type);
                Session::put('userLimitedAccess', $result->user->limited_access);
                Session::flash('flash_message', 'Welcome to ' . env('BUILDER_NAME'));

                $config_string = 'user-restrictions.'.$result->user->id;
                $user_restriction = config($config_string);

                $superusers = env('BACKEND_SUPERUSERS');
                $su_array = explode(',', $superusers);
                if (!in_array($result->user->id, $su_array)) {
                    Session::put('adminFullAccess', false);
                }

                if (Session::get('role') == 'rep' && Session::get('userType') == 'administrator') {
                    return redirect('administration/v1-0');
                }

                if ($user_restriction == 'fonts-minified-only') {
                    Session::put('fontsMinifiedOnly', true);
                } else {
                    Session::put('fontsMinifiedOnly', false);
                }

                Log::info('Successful User Login');
                if (Session::get('adminFullAccess')) {
                    return redirect('administration');
                } elseif (Session::get('fontsMinifiedOnly')){
                    return redirect('administration/'.config('user-restrictions.'.$user_restriction));
                } else {
                    return redirect('administration/v1-0');
                }
            }
            else
            {
                Session::flash('flash_message', 'Access Denied');

                Log::info("Failed Login Attempt : {$email}");
                return redirect('administration/login');
            }

        }
        catch (ClientException $e)
        {
            $error = $e->getMessage();
            Log::info('Login Attempt Error : ' . $error);
        }
    }

    public function loginForm(Request $request)
    {
        $errorMessage = null;
        if ($request->session()->has('error_message'))
        {
            $errorMessage = $request->session()->get('error_message', '');
        }
        return view('administration.auth.login', [
            'error_message' => $errorMessage
        ]);
    }

    public function administrationLogout()
    {
        $this->clearLoginSession();
        Log::info('User Logout');
        return redirect('administration/login');
    }

    protected function clearLoginSession()
    {
        Session::flush();
    }
}
