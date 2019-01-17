<?php

namespace App\Http\Controllers\ShoppingCart;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\ShoppingCart\CreateUserViaCartRequest;
use App\ShoppingCart\Cart;
use App\ShoppingCart\CartItemPlayer;
use App\ShoppingCart\User;
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

    public function createUserViaCart(Request $request)
    {
        return view('shopping-cart.create-user-via-cart');
    }

    public function storeUserViaCart(CreateUserViaCartRequest $request)
    {
        $user = User::create([
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'email' => $request->get('email'),
            'password' => bcrypt($request->get('password'))
        ]);

        if ($user instanceof User)
        {
            // login the user
            // assign cart into new user
            $cart_session = \Session::get('cart_session');
            $cart = Cart::findBySession($cart_session);

            \Auth::loginUsingId($user->id);

            \Log::info($cart->assignToUser($user) ? "Successfully assign current cart to new user" : "Cannot assign current cart to new user");

            \Session::flash('success', 'Successfully create account!');
            return redirect()->route('shopping-cart.client-info');
        }

        \Session::flash('success', 'Cannot create account this time. Please try again later.');
        return redirect()->route('shopping-cart');
    }
}
