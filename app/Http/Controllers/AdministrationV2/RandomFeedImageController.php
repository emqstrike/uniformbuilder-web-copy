<?php

namespace App\Http\Controllers\AdministrationV2;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class RandomFeedImageController extends Controller
{
    public function index()
    {
        return view('administration-lte-2.random-feed-image.index');
    }
}
