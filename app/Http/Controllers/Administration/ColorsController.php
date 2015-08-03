<?php

namespace App\Http\Controllers\Administration;

use \Session;
use App\Http\Requests;
use App\Utilities\APIClient;
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
        $this->client = new APIClient($settings);
    }

    /**
     * Colors
     */
    public function index()
    {
        $colors = $this->client->getColors();

        return view('administration/colors', [
            'colors' => $colors
        ]);
    }
}
