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
            Log::info('Login Attempt Error : ' . $error);
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
                Session::put('userId', $result->user->id);
                Session::put('isLoggedIn', $result->success);
                Session::put('fullname', $result->user->first_name . ' ' . $result->user->last_name);
                Session::put('email', $result->user->email);
                Session::put('accountType', $result->user->type);
                Session::put('accessToken', $result->access_token);
                Session::flash('flash_message', 'Welcome to QuickStrike Uniform Builder');

                Log::info('Successful User Login');
                return redirect('administration');
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

    public function logout()
    {
        if (Session::has('id')) Session::forget('id');
        if (Session::has('email')) Session::forget('email');
        if (Session::has('isLoggedIn')) Session::forget('isLoggedIn');
        if (Session::has('fullname')) Session::forget('fullname');
        if (Session::has('accessToken')) Session::forget('accessToken');

        Log::info('User Logout');
        return redirect('administration/login');
    }

    public function main()
    {
        return view('administration.oops');
    }
}
