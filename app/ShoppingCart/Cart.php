<?php

namespace App\ShoppingCart;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    const LIFE_SPAN = 60 * 60; // 1 hour

    protected $fillable = ["user_id", "session_id", "is_active", "is_cancelled", "is_checkout", "is_completed", "is_abandoned"];

    public function exceedInLifeSpan()
    {
        return Carbon::now() > Carbon::parse($this->created_at)->addSeconds(static::LIFE_SPAN);
    }
}
