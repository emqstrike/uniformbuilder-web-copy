<?php

namespace App\Http\Controllers\ShoppingCart;

use App\Auth\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\ShoppingCart\SaveClientInfo;
use App\ShoppingCart\ClientInformation;
use Illuminate\Http\Request;

class ClientInfoController extends Controller
{
    public function index(Request $request)
    {
        $client_information = Auth::user()->client_information;
        return view('shopping-cart.client-info', compact('client_information'));
    }

    public function store(SaveClientInfo $request)
    {
        $data = $request->all();
        $client_information = Auth::user()->client_information;

        if (is_null($client_information))
        {
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
                \Session::flash('success', "Client info successfully saved!");
                return redirect()->route("shopping-cart.billing");
            }

            return back();
        }

        return $this->update($request, $client_information->id);
    }

    public function update(SaveClientInfo $request, $id)
    {
        $data = $request->all();
        $client_information = ClientInformation::find($id);

        if (!is_null($client_information))
        {
            $client_information->full_name = $data['full_name'];
            $client_information->athletic_director = $data['athletic_director'];
            $client_information->email = $data['email'];
            $client_information->phone_number = $data['phone_number'];
            $client_information->fax = $data['fax'];
            $client_information->user_id = Auth::user()->id;

            if (!empty($client_information->getDirty()))
            {
                if ($client_information->save())
                {
                    \Session::flash('success', "Client info successfully saved!");
                }
            }

            return redirect()->route("shopping-cart.billing");
        }

        return redirect()->route("shopping-cart");
    }
}
