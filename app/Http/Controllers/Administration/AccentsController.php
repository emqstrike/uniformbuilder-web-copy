<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
// use App\APIClients\ColorsAPIClient as APIClient;

class AccentsController extends Controller
{
    // protected $client;

    // public function __construct(APIClient $apiClient)
    // {
    //     $this->client = $apiClient;
    // }

    /**
     * Colors
     */
    public function create()
    {
      

        return view("administration.accents.accent-create");
    }

 
    
}
