<?php
namespace App\Utilities;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Webmozart\Json\JsonDecoder;
use GuzzleHttp\Exception\ClientException;
use \Session;

class APIClient
{
    protected $client;
    protected $apiHost;

    public function __construct($accessToken = null)
    {
        $settings = [
            'base_uri' => 'http://' . getenv('API_HOST') . '/api/'
        ];
        if (!is_null($accessToken))
        {
            $settings['headers'] = [
                'accessToken' => $accessToken
            ];
        }
        $this->client = new Client($settings);
    }

    public function getColors()
    {
        $response = $this->client->get('colors');
        $decoder = new JsonDecoder();
        $result = $decoder->decode($response->getBody());

        $colors = [];
        if ($result->success)
        {
            $colors = $result->colors;
        }
        return $colors;
    }

    public function getMaterials()
    {
        $response = $this->client->get('materials');
        $decoder = new JsonDecoder();
        $result = $decoder->decode($response->getBody());

        $materials = [];
        if ($result->success)
        {
            $materials = $result->materials;
        }
        return $materials;
    }
}