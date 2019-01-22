<?php

namespace App\ShoppingCart;

use App\ShoppingCart\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    const LIFE_SPAN = 60 * 60; // 1 hour
    const CART_TOKEN_PREFIX = "cart_token_";

    protected $fillable = ["token", "is_active", "is_cancelled", "is_checkout", "is_completed", "is_abandoned", "user_id"];

    public function cart_items()
    {
        return $this->hasMany("App\ShoppingCart\CartItem");
    }

    public function user()
    {
        return $this->belongsTo('App\ShoppingCart\User');
    }

    public function scopeValidToUse($query)
    {
        return $query->where('is_active', 1)
                    ->where('is_completed', 0)
                    ->where('is_abandoned', 0);
    }

    public function isCompleted()
    {
        return $this->is_completed == 1;
    }

    public function hasOwner()
    {
        return !is_null($this->user);
    }

    public function assignToUser($user_id)
    {
        $this->user_id = $user_id;
        return $this->save();
    }

    public function mergeFromValidCarts($valid_carts)
    {
        foreach ($valid_carts as $cart)
        {
            if ($cart->id !== $this->id)
            {
                if (!$cart->cart_items->isEmpty())
                {
                    $cart->cart_items()->update(['cart_id' => $this->id]);

                    // delete old cart
                    $cart->delete();
                }
            }
        }
    }

    public static function findByToken($token)
    {
        return static::where('token', $token)
                ->validToUse()
                ->get()
                ->last();
    }

    /**
     * Two possible things to be happen:
     * - Create new cart if the user has no cart already
     * - Or use the valid cart of user and assign on him again
     *
     * @param  User|null $user
     * @return Cart
     */
    public static function takeCart($user=null)
    {
        if (!is_null($user))
        {
            $user_last_cart = $user->carts()->validToUse()->get()->last();

            if (!is_null($user_last_cart))
            {
                return $user_last_cart;
            }
        }

        $unique_token = static::generateUniqueSession();

        $cart = static::create([
            'user_id' => null,
            'token' => $unique_token,
            'is_active' => 1
        ]);

        return $cart;
    }

    public static function exceedInLifeSpan($timeout)
    {
        $duration = time() - (int) $timeout;
        return $duration >= static::LIFE_SPAN;
    }

    public static function generateUniqueSession()
    {
        if (!static::all()->isEmpty())
        {
            $cart_tokens = static::all()->pluck('token');

            do {
                $unique_token = uniqid(static::CART_TOKEN_PREFIX);
            } while (in_array($unique_token, $cart_tokens->toArray()));

            return $unique_token;
        }

        return uniqid(static::CART_TOKEN_PREFIX);
    }

    public static function abandon($cart_token)
    {
        $cart = static::where('token', $cart_token)->get()->last();
        $cart->is_abandoned = 1;
        return $cart->save();
    }
}
