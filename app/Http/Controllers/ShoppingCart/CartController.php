<?php

namespace App\Http\Controllers\ShoppingCart;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\ShoppingCart\Cart;
use App\ShoppingCart\CartItemPlayer;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $sizes = config('customizer.sizes');

        $cart_session = \Session::get('cart_session');
        $cart = Cart::findBySession($cart_session);

        return view('shopping-cart.cart', compact('sizes', 'sizes_json', 'cart'));
    }
}
