<?php

namespace App\Providers;

use App\APIClients\MaterialsAPIClient;
use App\Composers\BreadcrumbComposer;
use App\CurrencyConversion\CurrencyConversion;
use App\ShoppingCart\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        view()->composer('administration-lte-2.partials.breadcrumb','App\Composers\BreadcrumbComposer');

        if (config('customizer.enabled_https') and config('customizer.force_ssl')) {
            URL::forceSchema('https');
        }

        \Validator::extend('email_not_exist', function($attribute, $value, $parameters) {
            $user = User::findByEmail($value);
            return is_null($user);
        });

        \Validator::extend('alpha_spaces', function ($attribute, $value) {
            return preg_match('/^[\pL\s]+$/u', $value);
        });

        /**
         * Parameters:
         *
         * 0 - material id
         * 1 - pricing_age
         * 2 - size
         * 3 - price
         */
        \Validator::extend('valid_price', function($attribute, $value, $parameters, $validator) {
            list($material_id, $pricing_age, $size, $price) = $parameters;

            \Log::debug("material_id: {$material_id}");
            \Log::debug("pricing_age: {$pricing_age}");
            \Log::debug("size: {$size}");
            \Log::debug("price: {$price}");

            if (!is_null($material_id) && !is_null($size))
            {
                $apiClient = new MaterialsAPIClient;
                $material = $apiClient->getMaterial($material_id);

                $pricing = json_decode($material->pricing, true);
                $pricing = $pricing['properties'][$pricing_age];

                $currency_code_used = config("customizer.currency_code_used");
                $current_rate = CurrencyConversion::currentConversionRate($currency_code_used);

                $price_key = array_search($size, array_column($pricing, "size"));


                if (isset($pricing[$price_key]['msrp']))
                {
                    \Log::debug("msrp"  . ($pricing[$price_key]['msrp'] * $current_rate));

                    $msrp = $pricing[$price_key]['msrp'];
                    return $price === number_format(($msrp * $current_rate), 2);
                }

                \Log::debug("Error: 'msrp' is not define in pricing object.");
            }

            return false;
        });

        \Validator::extend('valid_pricing_age', function ($attribute, $value) {
            return in_array($value, config("customizer.pricing_ages"));
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
