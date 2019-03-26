<?php

namespace App\CurrencyConversion;

use Illuminate\Database\Eloquent\Model;

class CommonCurrency extends Model
{
    public static function getCurrency($currency_code_used)
    {
        $currency = static::where('code', $currency_code_used)
                        ->first();

        if (!is_null($currency))
        {
            return $currency;
        }

        \Log::error("Error: {$currency_code_used} is not valid currency code.");
        return null;
    }
}
