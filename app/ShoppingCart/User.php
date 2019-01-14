<?php

namespace App\ShoppingCart;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function getId()
    {
        return $this->id;
    }

    public function getFullName()
    {
        return $this->first_name . " " . $this->last_name;
    }
}
