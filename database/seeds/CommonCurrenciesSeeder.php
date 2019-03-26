<?php

use App\CurrencyConversion\CommonCurrency;
use Illuminate\Database\Seeder;

class CommonCurrenciesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @source https://gist.githubusercontent.com/Fluidbyte/2973986/raw/b0d1722b04b0a737aade2ce6e055263625a0b435/Common-Currency.json
     * @return void
     */
    public function run()
    {
        $commonCurrency = CommonCurrency::all();

        if ($commonCurrency->isEmpty())
        {
            $file = storage_path("data/common-currency.json");

            if (file_exists($file))
            {
                $common_currencies = json_decode(file_get_contents($file), true);

                if (!empty($common_currencies))
                {
                    foreach ($common_currencies as $common_currency)
                    {
                        echo "Seeding " . $common_currency['name'] . "..." . PHP_EOL;
                        $this->saveCommonCurrency(new CommonCurrency, $common_currency);
                    }
                }
                else
                {
                    \Log::debug("{$file} has no content.");
                }
            }
            else
            {
                \Log::debug("{$file} is not exist.");
            }
        }
        else
        {
            \Log::debug("Common currency already save in database.");
        }
    }

    public function saveCommonCurrency(CommonCurrency $commonCurrency, array $common_currency)
    {
        $commonCurrency->symbol = $common_currency['symbol'];
        $commonCurrency->name = $common_currency['name'];
        $commonCurrency->symbol_native = $common_currency['symbol_native'];
        $commonCurrency->decimal_digits = $common_currency['decimal_digits'];
        $commonCurrency->rounding = $common_currency['rounding'];
        $commonCurrency->code = $common_currency['code'];
        $commonCurrency->name_plural = $common_currency['name_plural'];

        return $commonCurrency->save();
    }
}
