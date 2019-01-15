<?php

namespace App\ShoppingCart;

use App\ShoppingCart\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    const LIFE_SPAN = 60 * 60; // 1 hour
    const CART_SESSION_PREFIX = "cart_session_";

    protected $fillable = ["user_id", "session", "is_active", "is_cancelled", "is_checkout", "is_completed", "is_abandoned"];

    public function cart_items()
    {
        return $this->hasMany("App\ShoppingCart\CartItems");
    }

    public function exceedInLifeSpan($timeout)
    {
        $duration = time() - (int) $timeout;
        return $duration >= static::LIFE_SPAN;
    }

    public function markAsAbandoned()
    {
        $this->is_abandoned = 1;
        return $this->save();
    }

    public static function findBySession($session)
    {
        return static::where('session', $session)->get()
                ->last();
    }

    /**
     * Give cart on user
     *
     * @param  User|null $user
     * @return Cart
     */
    public static function takeCart($user)
    {
        $unique_session = static::generateUniqueSession();

        $cart = static::create([
            'user_id' => $user instanceof User ? $user->getId() : null,
            'session' => $unique_session,
            'is_active' => 1
        ]);

        return $cart;
    }

    public static function generateUniqueSession()
    {
        if (!static::all()->isEmpty())
        {
            $cart_sessions = static::all()->pluck('session');

            do {
                $unique_session = uniqid(static::CART_SESSION_PREFIX);
            } while (in_array($unique_session, $cart_sessions->toArray()));

            return $unique_session;
        }

        return uniqid(static::CART_SESSION_PREFIX);
    }
}
