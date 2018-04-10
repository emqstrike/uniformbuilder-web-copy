<?php
/**
 * Created by PhpStorm.
 * User: nicosevilla
 * Date: 05/04/2018
 * Time: 8:16 AM
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use JavaScript;

class AppController extends Controller
{
//    public function __construct()
//    {
//        $this->middleware('auth');
//    }

    public function mySavedDesigns()
    {
//        JavaScript::put([
//            'name' => Auth::user()->name
//        ]);

        return view('saved-designs');
    }
}