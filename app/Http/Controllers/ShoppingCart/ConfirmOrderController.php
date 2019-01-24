<?php

namespace App\Http\Controllers\ShoppingCart;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\ShoppingCart\Cart;
use Illuminate\Http\Request;

class ConfirmOrderController extends Controller
{
    public function index()
    {
        $user = \Auth::user();
        $client_information = $user->client_information;
        $billing_information = $user->billing_information;
        $shipping_information = $user->shipping_information;

        return view('shopping-cart.confirm-order', compact('client_information', 'billing_information', 'shipping_information'));
    }

    public function confirmOrder()
    {
        $cart_token = \Session::get('cart_token');
        $cart = Cart::findByToken($cart_token);

        if ($cart->cart_items->isEmpty())
        {
            return redirect()->route('shopping-cart');
        }

        $user = \Auth::user();
        $client_information = $user->client_information;
        $billing_information = $user->billing_information;
        $shipping_information = $user->shipping_information;

        $order_input = [
            'action' => Cart::SAVE_ORDER_ACTION,

            'order' => [
                'client' => $client_information->full_name,
                'submitted' => Cart::SUBMITTED_FLAG,
                'user_id' => $user->id,
                'user_name' => $user->getFullName(),
                'origin' => env('APP_ENV'),
                'test_order' => config('customizer.test_orders') ? 1 : 0
            ],

            'athletic_director' => [
                'organization' => null, // skip
                'contact' => $client_information->athletic_director,
                'email' => $client_information->email,
                'phone' => $client_information->phone_number,
                'fax' => $client_information->fax
            ],

            'billing' => [
                'organization' => $billing_information->full_name,
                'contact' => $billing_information->athletic_director,
                'email' => $billing_information->email,
                'address' => $billing_information->address,
                'city' => $billing_information->city,
                'state' => $billing_information->state,
                'phone' => $billing_information->phone_number,
                'fax' => $billing_information->fax,
                'zip' => $billing_information->zip
            ],

            'shipping' => [
                'organization' => $shipping_information->full_name,
                'contact' => $shipping_information->athletic_director,
                'email' => $shipping_information->email,
                'address' => $shipping_information->address,
                'city' => $shipping_information->city,
                'state' => $shipping_information->state,
                'phone' => $shipping_information->phone_number,
                'fax' => $shipping_information->fax,
                'zip' => $shipping_information->zip
            ],

            'order_items' => []
        ];

        if (!$cart->cart_items->isEmpty())
        {
            $cart_items = $cart->cart_items;

            foreach ($cart_items as $cart_item) {
                array_push($order_input['order_items'], [
                    'brand' => $cart_item->brand,
                    'item_id' => $cart_item->item_id,
                    'block_pattern_id' => $cart_item->block_pattern_id,
                    'neck_option' => $cart_item->neck_option,
                    'description' => $cart_item->description,
                    'type' => $cart_item->type,
                    'builder_customizations' => $cart_item->builder_customizations,
                    'set_group_id' => $cart_item->set_group_id,
                    'factory_order_id' => $cart_item->factory_order_id,
                    'design_sheet ' => $cart_item->design_sheet,
                    'roster' => $cart_item->roster,
                    'price' => $cart_item->price,
                    'applicationType' => ucfirst($cart_item->application_type),
                    'application_type' => $cart_item->application_type,
                    'additional_attachments' => $cart_item->additional_attachments,
                    'notes' => $cart_item->notes
                ]);
            }
        }

        return response()->json($order_input);
    }
}
