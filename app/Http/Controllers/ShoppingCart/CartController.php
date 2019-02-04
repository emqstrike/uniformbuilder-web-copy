<?php

namespace App\Http\Controllers\ShoppingCart;

use App\APIClients\UsersAPIClient;
use App\Auth\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\ShoppingCart\CreateUserViaCartRequest;
use App\ShoppingCart\Cart;
use App\ShoppingCart\CartItemPlayer;
use App\ShoppingCart\User;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected $apiClient;

    public function __construct(UsersAPIClient $apiClient)
    {
        $this->apiClient = $apiClient;
    }

    public function index(Request $request)
    {
        $cart_token = \Session::get('cart_token');
        $cart = Cart::findByToken($cart_token);

        return view('shopping-cart.cart', compact('sizes_json', 'cart'));
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
            'password' => bcrypt($request->get('password')),
            'logged_in_token' => "abcde" // erase this after
        ]);

        if ($user instanceof User)
        {
            $cart_token = \Session::get('cart_token');
            $cart = Cart::findByToken($cart_token);

            // login the user
            $is_success = Auth::loginUsingId($user->id, $this->apiClient);

            if ($is_success)
            {
                // assign cart into new user
                \Log::info($cart->assignToUser($user->id) ? "Successfully assign current cart to new user" : "Cannot assign current cart to new user");

                \Session::flash('success', 'Successfully create account!');
                return redirect()->route('shopping-cart.client-info');
            }

            \Session::flash('warning', 'Cannot login the created account. Please login your new account manually.');
            return redirect()->route('shopping-cart');
        }

        \Session::flash('warning', 'Cannot create account this time. Please try again later.');
        return redirect()->route('shopping-cart');
    }
}
