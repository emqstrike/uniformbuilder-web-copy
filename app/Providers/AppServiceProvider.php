<?php

namespace App\Providers;

use App\Composers\BreadcrumbComposer;
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
