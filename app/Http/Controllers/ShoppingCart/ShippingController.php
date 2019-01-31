<?php

namespace App\Http\Controllers\ShoppingCart;

use App\Auth\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\ShoppingCart\SaveShippingInfo;
use App\ShoppingCart\ShippingInformation;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    public function index()
    {
        $shipping_information = Auth::user()->shipping_information;
        $client_information = Auth::user()->client_information;
        $same_as_client_info = !is_null($shipping_information) ? $shipping_information->sameAsClientInfo($client_information) : false;

        return view('shopping-cart.shipping', compact('shipping_information', 'same_as_client_info'));
    }

    public function store(SaveShippingInfo $request)
    {
        $data = $request->all();
        $shipping_information = Auth::user()->shipping_information;

        if (is_null($shipping_information))
        {
            $shipping_information = ShippingInformation::create([
                'full_name' => $data['full_name'],
                'athletic_director' => $data['athletic_director'],
                'email' => $data['email'],
                'phone_number' => $data['phone_number'],
                'fax' => $data['fax'],

                'address' => $data['address'],
                'state' => $data['state'],
                'city' => $data['city'],
                'zip' => $data['zip_code'],

                'user_id' => Auth::user()->id
            ]);

            if ($shipping_information instanceof ShippingInformation)
            {
                \Session::flash('success', "Shipping info successfully saved!");
                return redirect()->route("shopping-cart.confirm-order");
            }

            return back();
        }

        return $this->update($request, $shipping_information->id);
    }

    public function update(SaveShippingInfo $request, $id)
    {
        $data = $request->all();
        $shipping_information = ShippingInformation::find($id);

        if (!is_null($shipping_information))
        {
            $shipping_information->full_name = $data['full_name'];
            $shipping_information->athletic_director = $data['athletic_director'];
            $shipping_information->email = $data['email'];
            $shipping_information->phone_number = $data['phone_number'];
            $shipping_information->fax = $data['fax'];
            $shipping_information->address = $data['address'];
            $shipping_information->state = $data['state'];
            $shipping_information->city = $data['city'];
            $shipping_information->zip = $data['zip_code'];
            $shipping_information->user_id = Auth::user()->id;

            if (!empty($shipping_information->getDirty()))
            {
                if ($shipping_information->save())
                {
                    \Session::flash('success', "Shipping info successfully saved!");
                }
            }

            return redirect()->route("shopping-cart.confirm-order");
        }

        return redirect()->route("shopping-cart");
    }
}
