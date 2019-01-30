<?php

namespace App\ShoppingCart;

use Illuminate\Database\Eloquent\Model;

class ShippingInformation extends Model
{
    protected $fillable = ["full_name", "athletic_director", "email", "phone_number", "fax", "address", "state", "city", "zip", "user_id"];

    public function sameAsClientInfo(ClientInformation $clientInfo)
    {
        return (
            $this->full_name === $clientInfo->full_name &&
            $this->athletic_director === $clientInfo->athletic_director &&
            $this->email === $clientInfo->email &&
            $this->phone_number === $clientInfo->phone_number &&
            $this->fax === $clientInfo->fax
        );
    }
}
