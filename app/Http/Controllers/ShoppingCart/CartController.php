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

    /**
     * To be call through ajax
     *
     * Data available
     * - cart_item_id
     * - logged_in_token
     * - cart_session
     * - size
     * - last_name
     * - number
     * - quantity
     */
    public function addPlayerToCartItem(Request $request)
    {
        $cart_item_player = CartItemPlayer::create([
            'size' => $request->get('size'),
            'last_name' => $request->get('last_name'),
            'number' => $request->get('number'),
            'quantity' => $request->get('quantity'),
            'cart_item_id' => $request->get('cart_item_id')
        ]);

        return response()->json(
            $cart_item_player instanceof CartItemPlayer ?
            [
                'success' => true,
                'message' => "Successfully add player in cart item"
            ] :
            [
                'success' => false,
                'message' => "Cannot add player in cart item this time. Please try again later."
            ]
        );
    }
}
