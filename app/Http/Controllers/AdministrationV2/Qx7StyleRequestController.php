<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Qx7StyleRequestController extends Controller
{

    public function __construct(
        // APIClient $apiClient
    )
    {
        // $this->client = $apiClient;
    }

    public function index()
    {
        return view('administration-lte-2.qx7-style-requests.index');
    }

    public function show($id)
    {
        return view('administration-lte-2.qx7-style-requests.view');
    }

    public function createStyle($id)
    {
        return view('administration-lte-2.qx7-style-requests.create-style');
    }
}
