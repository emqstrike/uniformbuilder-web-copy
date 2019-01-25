<?php

namespace App\Http\Controllers\ShoppingCart\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\ShoppingCart\Cart;
use App\ShoppingCart\CartItem;
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

    /**
     * Data available
     * - logged_in_token
     * - cart_token
     * - name
     * - thumbnail
     * - brand
     * - item_id
     * - block_pattern_id
     * - neck_option
     * - description
     * - type
     * - builder_customization
     * - design_sheet
     */
    public function addToCart(Request $request)
    {
        $cart_token = $request->get('cart_token');
        $cart = Cart::findByToken($cart_token);

        $cart_item = CartItem::create([
            'material_id' => $request->get('material_id'),
            'name' => $request->get('name'),
            'thumbnail' => $request->get('thumbnail'),
            'brand' => $request->get('brand'),
            'item_id' => $request->get('item_id'),
            'block_pattern_id' => $request->get('block_pattern_id'),
            'neck_option' => $request->get('neck_option'),
            'description' => $request->get('description'),
            'type' => $request->get('type'),
            'builder_customization' => $request->get('builder_customization'),
            'design_sheet' => $request->get('design_sheet'),
            'cart_id' => $cart->id
        ]);

        return response()->json(
            $cart_item instanceof CartItem ?
            [
                'success' => true,
                'message' => "Successfully add item to cart",
                'cart_item_id' => 1
            ] :
            [
            'success' => false,
            'message' => "Cannot add the item to cart this time. Please try again later."
            ]
        );
    }

    /**
     * Data available
     * - logged_in_token
     * - cart_token
     * - builder_customization
     */
    public function updateItem(Request $request, CartItem $cartItem)
    {
        $cartItem->builder_customization = $request->get('builder_customization');
        $is_updated = $cartItem->save();

        return response()->json(
            $is_updated ?
            [
                'success' => true,
                'message' => "Successfully update item"
            ] :
            [
                'success' => false,
                'message' => "Cannot update the item this time. Please try again later."
            ]
        );
    }
}
