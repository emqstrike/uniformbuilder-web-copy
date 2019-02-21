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
     * - front_image
     * - size
     * - price
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
            'front_image' => $request->get('front_image'),
            'size' => $request->get('size'),
            'price' => $request->get('price'),
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
                'message' => "Successfully add item to cart.",
                'cart_item_id' => $cart_item->id
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
    public function updateItem(Request $request, $cart_item_id)
    {
        $cartItem = CartItem::find($cart_item_id);
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

    /**
     * Data available
     * - logged_in_token
     * - cart_token
     * - left_image
     */
    public function updateLeftImage(Request $request, $cart_item_id)
    {
        $cartItem = CartItem::find($cart_item_id);
        $cartItem->left_image = $request->get('left_image');
        $is_updated = $cartItem->save();

        return response()->json(
            $is_updated ?
            [
                'success' => true,
                'message' => "Successfully update left image of item."
            ] :
            [
                'success' => false,
                'message' => "Cannot update the left image of item this time. Please try again later."
            ]
        );
    }

    /**
     * Data available
     * - logged_in_token
     * - cart_token
     * - front_image
     */
    public function updateFrontImage(Request $request, $cart_item_id)
    {
        $cartItem = CartItem::find($cart_item_id);
        $cartItem->front_image = $request->get('front_image');
        $is_updated = $cartItem->save();

        return response()->json(
            $is_updated ?
            [
                'success' => true,
                'message' => "Successfully update front image of item."
            ] :
            [
                'success' => false,
                'message' => "Cannot update the front image of item this time. Please try again later."
            ]
        );
    }

    /**
     * Data available
     * - logged_in_token
     * - cart_token
     * - back_image
     */
    public function updateBackImage(Request $request, $cart_item_id)
    {
        $cartItem = CartItem::find($cart_item_id);
        $cartItem->back_image = $request->get('back_image');
        $is_updated = $cartItem->save();

        return response()->json(
            $is_updated ?
            [
                'success' => true,
                'message' => "Successfully update back image of item."
            ] :
            [
                'success' => false,
                'message' => "Cannot update the back image of item this time. Please try again later."
            ]
        );
    }

    /**
     * Data available
     * - logged_in_token
     * - cart_token
     * - right_image
     */
    public function updateRightImage(Request $request, $cart_item_id)
    {
        $cartItem = CartItem::find($cart_item_id);
        $cartItem->right_image = $request->get('right_image');
        $is_updated = $cartItem->save();

        return response()->json(
            $is_updated ?
            [
                'success' => true,
                'message' => "Successfully update right image of item."
            ] :
            [
                'success' => false,
                'message' => "Cannot update the right image of item this time. Please try again later."
            ]
        );
    }

    /**
     * Data available
     * - logged_in_token
     * - cart_token
     */
    public function deleteToCart(Request $request, $cart_item_id)
    {
        $cartItem = CartItem::find($cart_item_id);
        $cartItem->cartItemPlayers()->delete();
        $is_deleted = $cartItem->delete();

        return response()->json(
            $is_deleted ?
            [
                'success' => true,
                'message' => "Successfully delete item to cart"
            ] :
            [
                'success' => false,
                'message' => "Cannot delete item to cart this time. Please try again later."
            ]
        );
    }

    /**
     * Data available
     * - logged_in_token
     * - cart_token
     */
    public function retainItem(Request $request, $cart_item_id)
    {
        $cart_token = $request->get('cart_token');
        $cart = Cart::findByToken($cart_token);
        $cart_items = $cart->cart_items;

        $cart_item = CartItem::find($cart_item_id);
        $duplicate_item_ids = $cart_item->getDuplicateItem($cart->id)->pluck('id')->toArray();

        // remove cart item id that to be retain
        unset($duplicate_item_ids[array_search($cart_item_id, $duplicate_item_ids)]);

        $destroy_nums = CartItem::destroy($duplicate_item_ids);

        return response()->json(
            $destroy_nums > 0 ?
            [
                'success' => true,
                'message' => "Successfully retain the cart item"
            ] :
            [
                'success' => false,
                'message' => "Cannot retain the cart item this time. Please try again later."
            ]
        );
    }
}
