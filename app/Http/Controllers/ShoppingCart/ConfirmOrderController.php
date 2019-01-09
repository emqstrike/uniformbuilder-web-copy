<?php

namespace App\Http\Controllers\ShoppingCart;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ConfirmOrderController extends Controller
{
    public function index()
    {
        return view('shopping-cart.confirm-order');
    }
}
