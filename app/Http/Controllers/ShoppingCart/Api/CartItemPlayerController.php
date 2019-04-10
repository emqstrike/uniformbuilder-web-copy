<?php

namespace App\Http\Controllers\ShoppingCart\Api;

use App\CurrencyConversion\CurrencyConversion;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\ShoppingCart\CartItemPlayerRequest;
use App\ShoppingCart\Cart;
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
     * - cart_token
     * - size
     * - last_name
     * - number
     * - price
     * - quantity
     */
    public function add(CartItemPlayerRequest $request)
    {
        $material_id = $request->get('material_id');
        $pricing_age = $request->get('pricing_age');
        $size = $request->get('size');
        $price = $request->get('price');
        $quantity = !empty($request->get('quantity')) ? $request->get('quantity') : 1;

        if (!CurrencyConversion::validPrice($material_id, $pricing_age, $size, $price))
        {
            return response()->json([
                'success' => false,
                'message' => "Looks like you modify the default price of items. The system will force to load automatically."
            ]);
        }

        $cart_item_player = CartItemPlayer::create([
            'size' => $size,
            'last_name' => $request->get('last_name'),
            'number' => $request->get('number'),
            'price' => $price,
            'quantity' => $quantity,
            'cart_item_id' => $request->get('cart_item_id')
        ]);

        return response()->json(
            $cart_item_player instanceof CartItemPlayer ?
            [
                'success' => true,
                'message' => "Successfully add player in cart item",
                'data' => [
                    'id' => $cart_item_player->id,
                    'size' => $size,
                    'last_name' => $cart_item_player->last_name,
                    'number' => $cart_item_player->number,
                    'price' => (float) $price,
                    'quantity' => (int) $quantity
                ]
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
     * - cart_token
     * - size
     * - last_name
     * - number
     * - quantity
     */
    public function update(CartItemPlayerRequest $request, CartItemPlayer $cartItemPlayer)
    {
        $material_id = $request->get('material_id');
        $pricing_age = $request->get('pricing_age');
        $size = $request->get('size');
        $price = $request->get('price');
        $quantity = !empty($request->get('quantity')) ? $request->get('quantity') : 1;

        if (!CurrencyConversion::validPrice($material_id, $pricing_age, $size, $price))
        {
            return response()->json([
                'success' => false,
                'message' => "Looks like you modify the default price of items. The system will force to load automatically."
            ]);
        }

        $cartItemPlayer->last_name = $request->get('last_name');
        $cartItemPlayer->number = $request->get('number');
        $cartItemPlayer->quantity = $quantity;

        $is_updated = $cartItemPlayer->save();

        return response()->json(
            $is_updated ?
            [
                'success' => true,
                'message' => "Successfully update player in cart item"
            ] :
            [
                'success' => false,
                'message' => "Cannot update player in cart item this time. Please try again later."
            ]
        );
    }

    /**
     * Data available
     * - logged_in_token
     * - cart_token
     */
    public function delete(Request $request, CartItemPlayer $cartItemPlayer)
    {
        $cart_token = $request->get('cart_token');
        $cart = Cart::findByToken($cart_token);

        $cart_item_ids = $cart->cart_items->pluck("id")->toArray();

        if (!in_array($cartItemPlayer->cart_item->id, $cart_item_ids))
        {
            return response()->json([
                'success' => false,
                'message' => "Cannot delete player if you are not the owner."
            ]);
        }

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
     * - cart_token
     */
    public function getPlayersPerCartItem(Request $request)
    {
        $cart_token = $request->get('cart_token');
        $cart = Cart::findByToken($cart_token);

        $data = fractal($cart->cart_items, new CartItemPlayerTransformer)->toArray();
        return response()->json(array_merge(['success' => true], $data));
    }
}
