<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;

class SSOAuthenticationController extends Controller
{
    public function authorize(Request $request)
    {
        $query = http_build_query([
            'client_id' => config('sso.client_id'),
            'redirect_uri' => config('sso.redirect_uri'),
            'response_type' => 'code',
            'scope' => ''
        ]);

        return redirect('http://localhost:8000/oauth/authorize?' . $query);
    }

    public function authorization_callback(Request $request)
    {
        $http = new Client;

        if ($request->has('code'))
        {
            $response = $http->post('http://localhost:8000/oauth/token', [
                'form_params' => [
                    'grant_type' => 'authorization_code',
                    'client_id' => config('sso.client_id'),
                    'client_secret' => config('sso.secret'),
                    'redirect_uri' => config('sso.redirect_uri'),
                    'code' => $request->code
                ]
            ]);
        }
        else
        {
            return response()->json([
                // 'error' => $request->error
                'error' => 'Something went wrong'
            ]);
        }

        return json_decode((string) $response->getBody(), true);
    }
}
