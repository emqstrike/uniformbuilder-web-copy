<?php

namespace App\Providers;

use App\Composers\BreadcrumbComposer;
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
