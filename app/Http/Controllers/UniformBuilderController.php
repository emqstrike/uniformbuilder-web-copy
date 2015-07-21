<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class UniformBuilderController extends Controller
{
   
    public function index()
    {
        
        return view('editor.index', [

            'page_title' => 'QuickStrike Uniform Builder',

        ]);

    }

}
