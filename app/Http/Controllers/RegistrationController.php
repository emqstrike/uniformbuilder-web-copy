<?php

namespace App\Http\Controllers;

use Session;
use Redirect;
use App\Utilities\Log;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use GuzzleHttp\Exception\ClientException;
use App\APIClients\UsersAPIClient as APIClient;

class RegistrationController extends Controller
{
    protected $client;
    protected $redirectUrl;

    public function __construct(APIClient $client)
    {
        $this->client = $client;
        $this->redirectUrl = '/index';
    }

    public function register(Request $request)
    {
        $firstName = $request->input('first_name');
        $lastName = $request->input('last_name');
        $email = $request->input('email');
        $password = $request->input('password');

        $state = $request->input('state');
        $zip = $request->input('zip');
        $rep = intval($request->input('rep'));

        $data = [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'password' => $password,
            'state' => $state,
            'zip' => $zip,
            'default_rep_id' => $rep,
        ];

        // Does the User exist
        if ($this->client->isEmailTaken($email))
        {
            return Redirect::to($this->redirectUrl)
                            ->with('message', 'User email already exist');
        }

        $logData = $data;
        unset($logData['password']);
        Log::info('Attempts to create a new User ' . json_encode($logData), 'FRONT END');
        $response = $this->client->createUser($data);

        if ($response->success)
        {
            Log::info('Save New User: Success', 'FRONT END');
            return Redirect::to($this->redirectUrl)
                            ->with('message', 'Successfully Registered');
        }
        else
        {
            Log::info('Save New User: Failed', 'FRONT END');
            return Redirect::to($this->redirectUrl)
                            ->with('message', $response->message);
        }
    }

    public function activateUser($activationCode)
    {
        Log::info('Attempts to activate a user using activation_code ' . json_encode($activationCode), 'FRONT END');
        $response = $this->client->activateUser([
            'activation_code' => $activationCode
        ]);
        $message = 'Your user account failed to activate';
        if ($response['success'])
        {
            Log::info('User Activation: Success', 'FRONT END');
            $message = 'Your user account is now activated';
        }

        Session::flash('message', $message);
        return redirect('index');
    }
}
