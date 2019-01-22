<?php

namespace App\Http\Controllers\ShoppingCart;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\ShoppingCart\SaveClientInfo;
use App\ShoppingCart\ClientInformation;
use Illuminate\Http\Request;

class ClientInfoController extends Controller
{
    public function index(Request $request)
    {
        return view('shopping-cart.client-info');
    }

    public function store(SaveClientInfo $request)
    {
        $data = $request->all();

        $client_info = ClientInformation::create([
            'full_name' => $data['full_name'],
            'athletic_director' => $data['athletic_director'],
            'email' => $data['email'],
            'phone_number' => $data['phone_number'],
            'fax' => $data['fax'],
            'user_id' => Auth::user()->id
        ]);

        if ($client_info instanceof ClientInformation)
        {
            die('success');
        }

        die('fail');
    }
}
