<?php

namespace App\Console\Commands;

use App\CurrencyConversion\ApiClient;
use App\CurrencyConversion\CurrencyConversion;
use Illuminate\Console\Command;
use Illuminate\Database\QueryException;

class UpdateCurrencyConversion extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:currency_conversion';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update latest currency conversion in database';

    /**
     * @var ApiClient
     */
    protected $apiClient;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->apiClient = new ApiClient(config("currency-conversion"));
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $live = $this->apiClient->live;

        if ($live->success)
        {
            if (isset($live->quotes))
            {
                \Log::info("Saving latest currency conversion in database..." . PHP_EOL);
                $this->savingLatestCurrencyConversion($live->quotes);
            }
        }
    }

    public function savingLatestCurrencyConversion($quotes)
    {
        try {
            $savedCurrencyConversion = CurrencyConversion::all();

            if ($savedCurrencyConversion->isEmpty())
            {
                foreach ($quotes as $currency_pair => $conversion_rate) {
                    CurrencyConversion::create(compact("currency_pair", "conversion_rate"));
                }
            }
            else
            {
                foreach ($quotes as $currency_pair => $conversion_rate) {
                    CurrencyConversion::where('currency_pair', $currency_pair)
                        ->update(compact("currency_pair", "conversion_rate"));
                }
            }

            return true;
        } catch (QueryException $e) {
            \Log::error($e->getMessage());
            return false;
        }
    }
}
