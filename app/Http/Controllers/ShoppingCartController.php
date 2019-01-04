<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ShoppingCartController extends Controller
{
    public function cart()
    {
        return view('shopping-cart.cart');
    }

    public function billing()
    {
        return view('shopping-cart.billing');
    }

    public function shipping()
    {
        return view('shopping-cart.shipping');
    }

    public function confirmOrder()
    {
        return view('shopping-cart.confirm-order');
    }
}
