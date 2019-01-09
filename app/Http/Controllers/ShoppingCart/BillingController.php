<?php

namespace App\Http\Controllers\ShoppingCart;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\ShoppingCart\SaveBillingInfo;
use App\ShoppingCart\BillingInformation;
use Illuminate\Http\Request;

class BillingController extends Controller
{
    public function index()
    {
        return view('shopping-cart.billing');
    }

    public function store(SaveBillingInfo $request)
    {
        $data = $request->all();

        $billing_info = BillingInformation::create([
            'full_name' => $data['full_name'],
            'athletic_director' => $data['athletic_director'],
            'email' => $data['email'],
            'phone_number' => $data['phone_number'],
            'fax' => $data['fax'],

            'address' => $data['address'],
            'state' => $data['state'],
            'city' => $data['city'],
            'zip' => $data['zip_code'],

            'user_id' => 1 // assumed
        ]);

        if ($billing_info instanceof BillingInformation)
        {
            die('success');
        }

        die('fail');
    }
}
