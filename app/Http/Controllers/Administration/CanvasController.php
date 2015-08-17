<?php

namespace App\Http\Controllers\Administration;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Webmozart\Json\JsonDecoder;
use App\APIClients\APIClient;

class CanvasController extends Controller
{
    protected $client;
    protected $decoder;

    public function __construct(APIClient $apiClient, JsonDecoder $decoder)
    {
        $this->client = $apiClient;
        $this->decoder = $decoder;
    }

    public function index()
    {

        $title = 'Prolook Canvas';

        return view('administration.canvas.index', [
            
            'page_title' => $title,
            'asset_version' =>  env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            
        ]);

    }

    public function texturing_guide(){

        $title = 'Prolook Canvas - Texturing Guide';

        return view('administration.canvas.texturing-guide', [
            
            'page_title' => $title,
            'asset_version' =>  env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            
        ]);

    }

}
