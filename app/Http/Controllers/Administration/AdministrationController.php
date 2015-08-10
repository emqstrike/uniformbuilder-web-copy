<?php

namespace App\Http\Controllers\Administration;

use \Session;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Utilities\APIClient;
use App\Http\Controllers\Controller;
use GuzzleHttp\Exception\ClientException;

class AdministrationController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        if (Session::has('isLoggedIn'))
        {
            if (Session::get('isLoggedIn') == true)
            {
                return view('welcome');
            }
        }
        return redirect('administration/login');
    }
}
