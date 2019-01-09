<?php

namespace App\ShoppingCart;

use Illuminate\Database\Eloquent\Model;

class ShippingInformation extends Model
{
    protected $fillable = ["full_name", "athletic_director", "email", "phone_number", "fax", "address", "state", "city", "zip", "user_id"];
}
