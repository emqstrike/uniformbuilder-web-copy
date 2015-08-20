<?php
namespace App\Http\Controllers\Administration;

use Log;
use \Session;
use App\Http\Requests;
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
                Session::put('isLoggedIn', $result->success);
                Session::put('fullname', $result->user->first_name . ' ' . $result->user->last_name);
                Session::put('email', $result->user->email);
                Session::put('accountType', $result->user->type);
                Session::put('accessToken', $result->access_token);
                Session::flash('flash_message', 'Welcome to QuickStrike Uniform Builder');

                return redirect('/');
            }
            else
            {
                Session::flash('flash_message', $result->message);
                return redirect('login');
            }

        }
        catch (ClientException $e)
        {
            $error = $e->getMessage();
            error_log('Error:' . $error);
        }
    }

    /**
     * Administration Login
     */
    public function administrationLogin(Request $request)
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

            // Only 'administrator' Account Type can login
            if ($result->success && $result->user->type == 'administrator')
            {
                Session::put('isLoggedIn', $result->success);
                Session::put('fullname', $result->user->first_name . ' ' . $result->user->last_name);
                Session::put('email', $result->user->email);
                Session::put('accountType', $result->user->type);
                Session::put('accessToken', $result->access_token);
                Session::flash('flash_message', 'Welcome to QuickStrike Uniform Builder');

                Log::info('[ADMIN] Successful User Login: ' . Session::get('fullname') . ' (' . Session::get('email') . ')');
                return redirect('administration');
            }
            else
            {
                Session::flash('flash_message', 'Access Denied');

                Log::info('[ADMIN] Failed Login Attempt: ' . $email);
                return redirect('administration/login');
            }

        }
        catch (ClientException $e)
        {
            $error = $e->getMessage();
            Log::info('[ADMIN] Login Attempt Error : ' . $error);
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

    public function logout()
    {
        $email = null;
        if (Session::has('email'))
        {
            $email = Session::get('email');
            Session::forget('email');
        }
        if (Session::has('isLoggedIn')) Session::forget('isLoggedIn');
        $fullname = null;
        if (Session::has('fullname'))
        {
            $fullname = Session::get('fullname');
            Session::forget('fullname');
        }
        if (Session::has('accessToken')) Session::forget('accessToken');

        Log::info('[ADMIN] User Logout : ' . $fullname . ' (' . $email . ')');
        return redirect('administration/login');
    }
}
