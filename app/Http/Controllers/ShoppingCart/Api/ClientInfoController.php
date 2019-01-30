<?php

namespace App\Http\Controllers\ShoppingCart\Api;

use App\Http\Controllers\Controller;
use App\ShoppingCart\User;
use Illuminate\Http\Request;

class ClientInfoController extends Controller
{
    /**
     * Data available
     * - logged_in_token
     * - cart_token
     */
    public function getInfo(Request $request)
    {
        $user = User::findByLoggedInToken($request->get('logged_in_token'));
        return response()->json([
            'success' => true,
            'data' => $user->client_information->toArray()
        ]);
    }
}
