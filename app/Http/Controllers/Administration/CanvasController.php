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

        // For asset versioning, to force update scripts and stylesheets instead of being loaded from browser cache
        $asset = [
            'version' => '?v=0.001',
            'storage' => ''
        ];

        //// API SAMPLE

        // $response = $this->client->get('categories');
        // $result = $this->decoder->decode($response->getBody());

        // if ($result->success)
        // {
        //     $categories = $result->categories;
        // }
        
        // $categories = new \App\APIClients\UniformCategoriesAPIClient();
        // $result = $categories->getUniformCategories();
        // dd($result);

        //// END API SAMPLE

         return view('administration.canvas.index', [
            
            'page_title' => $title,
            'asset_version' => $asset['version'],
            'asset_storage' => $asset['storage'],
            
        ]);

    }
}
