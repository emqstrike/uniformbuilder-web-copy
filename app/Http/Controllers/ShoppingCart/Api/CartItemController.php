<?php

namespace App\Http\Controllers\ShoppingCart\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\ShoppingCart\Cart;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    /**
     * Data available
     * - logged_in_token
     * - cart_token
     */
    public function getCartItems(Request $request)
    {
        $cart_token = $request->get('cart_token');
        $cart = Cart::findByToken($cart_token);

        $data = $cart->cart_items->toArray();
        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }
}
