<?php
namespace App\APIClients;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Webmozart\Json\JsonDecoder;
use GuzzleHttp\Exception\ClientException;
use \Session;

class APIClient extends Client
{
    protected $decoder;

    public function __construct()
    {
        $settings = [
            'base_uri' => getenv('API_HOST') . '/api/'
        ];

        if (env('APP_ENV') == 'testing') {
            $accessToken = env('DEV_TOKEN_KEY');
        } else {
            $accessToken = Session::get('accessToken');
        }

        if (!is_null($accessToken))
        {
            $settings['headers'] = [
                'accessToken' => $accessToken
            ];
        }
        parent::__construct($settings);
        $this->decoder = new JsonDecoder();
    }
}