<?php

namespace App\Console;

use App\Console\Commands\AssetVersionUpgradeCommand;
use App\Console\Commands\Inspire;
use App\Console\Commands\UpdateCurrencyConversion;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        AssetVersionUpgradeCommand::class,
        Inspire::class,
        UpdateCurrencyConversion::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('update:currency_conversion')
                 ->hourly();
    }
}
