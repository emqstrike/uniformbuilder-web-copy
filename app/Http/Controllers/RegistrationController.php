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
        $this->redirectUrl = '/uniform-builder-index';
    }

    public function register(Request $request)
    {
        $firstName = $request->input('first_name');
        $lastName = $request->input('last_name');
        $email = $request->input('email');
        $password = $request->input('password');

        $data = [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'password' => $password
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
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Save New User: Failed', 'FRONT END');
            return Redirect::to($this->redirectUrl)
                            ->with('message', $response->message);
        }
    }
}
