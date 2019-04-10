<?php

namespace App\CurrencyConversion;

use App\APIClients\MaterialsAPIClient;
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

    public static function validPrice($material_id, $pricing_age, $size, $price)
    {
        $apiClient = new MaterialsAPIClient;
        $material = $apiClient->getMaterial($material_id);

        $pricing = json_decode($material->pricing, true);
        $pricing = $pricing['properties'][$pricing_age];

        $currency_code_used = config("customizer.currency_code_used");
        $current_rate = static::currentConversionRate($currency_code_used);

        $price_key = array_search($size, array_column($pricing, "size"));

        if (isset($pricing[$price_key]['msrp']))
        {
            $msrp = $pricing[$price_key]['msrp'];
            return number_format($price, 2) === number_format($msrp * $current_rate, 2);
        }

        \Log::debug("Error: 'msrp' is not define in pricing object.");
        return false;
    }
}