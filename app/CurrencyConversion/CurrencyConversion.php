<?php

namespace App\CurrencyConversion;

use Illuminate\Database\Eloquent\Model;

class CurrencyConversion extends Model
{
    protected $fillable = ["currency_pair", "conversion_rate"];
}