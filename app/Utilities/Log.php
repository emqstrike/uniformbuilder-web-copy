<?php

namespace Customizer\Utilities;

use Log as Monolog;
use Session;

class Log extends Monolog
{
    public static function getUser()
    {
        return (Session::has('isLoggedIn'))
            ? Session::get('fullname') . ' (' . Session::get('email') . ')'
            : null;
    }

    public static function emergency($message, $category = 'ADMIN')
    {
        $user = self::getUser();
        Monolog::emergency("[$category] {$user} {$message}");
    }

    public static function alert($message, $category = 'ADMIN')
    {
        $user = self::getUser();
        Monolog::alert("[$category] {$user} {$message}");
    }

    public static function critical($message, $category = 'ADMIN')
    {
        $user = self::getUser();
        Monolog::critical("[$category] {$user} {$message}");
    }

    public static function error($message, $category = 'ADMIN')
    {
        $user = self::getUser();
        Monolog::error("[$category] {$user} {$message}");
    }

    public static function warning($message, $category = 'ADMIN')
    {
        $user = self::getUser();
        Monolog::warning("[$category] {$user} {$message}");
    }

    public static function notice($message, $category = 'ADMIN')
    {
        $user = self::getUser();
        Monolog::notice("[$category] {$user} {$message}");
    }

    public static function info($message, $category = 'ADMIN')
    {
        $user = self::getUser();
        Monolog::info("[$category] {$user} {$message}");
    }

    public static function debug($message, $category = 'ADMIN')
    {
        $user = self::getUser();
        Monolog::debug("[$category] {$user} {$message}");
    }
}