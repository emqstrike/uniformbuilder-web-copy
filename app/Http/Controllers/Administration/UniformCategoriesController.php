<?php

namespace App\Http\Controllers\Administration;

use \Session;
use App\Http\Requests;
use App\Utilities\APIClient;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;

class UniformCategoriesController extends Controller
{
    protected $client;

    public function __construct($accessToken = null)
    {
        $settings = [
            'base_uri' => 'http://' . getenv('API_HOST') . '/api/',
        ];
        if (!is_null($accessToken))
        {
            $settings['headers'] = [
                'accessToken' => $accessToken
            ];
        }
        $this->client = new APIClient($settings);
    }

    public function index()
    {
        $categories = $this->client->getUniformCategories();

        return view('administration.categories.categories', [
            'categories' => $categories,
            'api_host' => env('API_HOST')
        ]);
    }
}
