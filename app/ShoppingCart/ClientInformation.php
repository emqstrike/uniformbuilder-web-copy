<?php

namespace App\ShoppingCart;

use Illuminate\Database\Eloquent\Model;

class ClientInformation extends Model
{
    protected $fillable = ["full_name", "athletic_director", "email", "phone_number", "fax", "user_id"];
}
