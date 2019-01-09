<?php

namespace App\Http\Controllers\ShoppingCart;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\ShoppingCart\SaveShippingInfo;
use App\ShoppingCart\ShippingInformation;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    public function index()
    {
        return view('shopping-cart.shipping');
    }

    public function store(SaveShippingInfo $request)
    {
        $data = $request->all();

        $billing_info = ShippingInformation::create([
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

        if ($billing_info instanceof ShippingInformation)
        {
            die('success');
        }

        die('fail');
    }
}
