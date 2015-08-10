<?php
namespace App\Http\Controllers\Administration;

use Illuminate\Http\Request;

use \Session;
use App\Http\Requests;
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
                Session::put('accessToken', $result->access_token);
                Session::flash('flash_message', 'Welcome to QuickStrike Uniform Builder');

                return redirect('administration');
            }
            else
            {
                Session::flash('flash_message', $result->message);
                return redirect('administration/login');
            }

        }
        catch (ClientException $e)
        {
            $error = $e->getMessage();
            error_log('Error:' . $error);
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
        if (Session::has('isLoggedIn')) Session::forget('isLoggedIn');
        if (Session::has('fullname')) Session::forget('fullname');
        if (Session::has('email')) Session::forget('email');
        if (Session::has('accessToken')) Session::forget('accessToken');
        return redirect('administration/login');
    }
}
