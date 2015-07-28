<?php

namespace App\Http\Controllers\Administration;

use \Session;
use GuzzleHttp\Client;
use App\Http\Requests;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;

class ColorsController extends Controller
{
    protected $client;
    protected $apiHost;

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
        $this->client = new Client($settings);
    }

    /**
     * Colors
     */
    public function index()
    {
        $response = $this->client->get('colors');
        $decoder = new JsonDecoder();
        $result = $decoder->decode($response->getBody());

        $colors = [];
        if ($result->success)
        {
            $colors = $result->colors;
        }

        return view('administration/colors', [
            'colors' => $colors
        ]);
    }
}
