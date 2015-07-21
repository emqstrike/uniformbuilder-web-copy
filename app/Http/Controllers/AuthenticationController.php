<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AuthenticationController extends Controller
{
    public function loginForm()
    {
        return view('administration.auth.login');
    }

    public function registerForm()
    {
        return view('administration.auth.register');
    }
}
