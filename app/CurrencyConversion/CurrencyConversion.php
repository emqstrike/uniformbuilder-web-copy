<?php

namespace App\CurrencyConversion;

use Illuminate\Database\Eloquent\Model;

class CurrencyConversion extends Model
{
    protected $fillable = ["currency_pair", "conversion_rate"];

    const CURRENCY_SOURCE = "USD";

    public static function currentConversionRate($currency_code_used)
    {
        $currencyConversion = static::where('currency_pair', static::CURRENCY_SOURCE . "{$currency_code_used}")
                                    ->first();

        if (!is_null($currencyConversion))
        {
            return $currencyConversion->conversion_rate;
        }

        \Log::error("Error: " . static::CURRENCY_SOURCE . "{$currency_code_used} is not valid currency pair.");
        return 1;
    }
}