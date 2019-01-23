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
        $billing_information = \Auth::user()->billing_information;
        return view('shopping-cart.billing', compact('billing_information'));
    }

    public function store(SaveBillingInfo $request)
    {
        $data = $request->all();
        $billing_information = \Auth::user()->billing_information;

        if (is_null($billing_information))
        {
            $billing_information = BillingInformation::create([
                'full_name' => $data['full_name'],
                'athletic_director' => $data['athletic_director'],
                'email' => $data['email'],
                'phone_number' => $data['phone_number'],
                'fax' => $data['fax'],

                'address' => $data['address'],
                'state' => $data['state'],
                'city' => $data['city'],
                'zip' => $data['zip_code'],

                'user_id' => \Auth::user()->id
            ]);

            if ($billing_information instanceof BillingInformation)
            {
                \Session::put('success', "Billing info successfully saved!");
                \Session::save();
                return redirect()->route("shopping-cart.shipping");
            }

            return back();
        }

        return $this->update($request, $billing_information->id);
    }

    public function update(SaveBillingInfo $request, $id)
    {
        $data = $request->all();
        $billing_information = BillingInformation::find($id);

        if (!is_null($billing_information))
        {
            $billing_information->full_name = $data['full_name'];
            $billing_information->athletic_director = $data['athletic_director'];
            $billing_information->email = $data['email'];
            $billing_information->phone_number = $data['phone_number'];
            $billing_information->fax = $data['fax'];
            $billing_information->address = $data['address'];
            $billing_information->state = $data['state'];
            $billing_information->city = $data['city'];
            $billing_information->zip = $data['zip_code'];
            $billing_information->user_id = \Auth::user()->id;

            if (!empty($billing_information->getDirty()))
            {
                if ($billing_information->save())
                {
                    \Session::put('success', "Billing info successfully saved!");
                    \Session::save();
                }
            }

            return redirect()->route("shopping-cart.shipping");
        }

        return redirect()->route("shopping-cart");
    }
}
