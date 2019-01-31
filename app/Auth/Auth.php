<?php

namespace App\Auth;

use App\ShoppingCart\User;

class Auth
{
    public static function check()
    {
        return !is_null(\Session::get('isLoggedIn')) ? \Session::get('isLoggedIn') : false;
    }

    public static function user()
    {
        if (static::check() && !is_null(\Session::get('userId')))
        {
            return User::find(\Session::get('userId'));
        }

        return null;
    }
}