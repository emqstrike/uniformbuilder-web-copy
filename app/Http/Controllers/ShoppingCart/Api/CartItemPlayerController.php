<?php

namespace App\Http\Controllers\ShoppingCart\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\ShoppingCart\CartItem;
use App\ShoppingCart\CartItemPlayer;
use App\Transformers\CartItemPlayerTransformer;
use Illuminate\Http\Request;

class CartItemPlayerController extends Controller
{
    /**
     * Data available
     * - cart_item_id
     * - logged_in_token
     * - cart_session
     * - size
     * - last_name
     * - number
     * - quantity
     */
    public function addPlayer(Request $request, $cart_item_id)
    {
        $cart_item_player = CartItemPlayer::create([
            'size' => $request->get('size'),
            'last_name' => $request->get('last_name'),
            'number' => $request->get('number'),
            'quantity' => $request->get('quantity'),
            'cart_item_id' => $cart_item_id
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

    /**
     * Data available
     * - logged_in_token
     * - cart_session
     */
    public function deletePlayer(Request $request, $cart_item_id, CartItemPlayer $cartItemPlayer)
    {
        $is_deleted = $cartItemPlayer->delete();

        return response()->json(
            $is_deleted ?
            [
                'success' => true,
                'message' => "Successfully delete player in cart item"
            ] :
            [
                'success' => false,
                'message' => "Cannot delete player in cart item this time. Please try again later."
            ]
        );
    }

    /**
     * Data available
     * - logged_in_token
     * - cart_session
     */
    public function getPlayersPerCartItem(Request $request)
    {
        $cart_items = CartItem::all();
        return fractal($cart_items, new CartItemPlayerTransformer)->toArray();
    }
}
