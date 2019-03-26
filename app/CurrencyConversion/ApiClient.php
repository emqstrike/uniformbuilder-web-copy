<?php

namespace App\CurrencyConversion;

use GuzzleHttp\Client;
use Webmozart\Json\JsonDecoder;

/**
 * Take note: Using properties live, historical, convert, timeframe, and change of ApiClient class
 * must be pass in to another variable to avoid multiple request in currency layer api.
 * Because requesting api is limited.
 */
class ApiClient
{
    private $access_key;
    private $base_uri;
    private $client;
    private $decoder;

    const ENDPOINT_LIVE = "live";
    const ENDPOINT_HISTORICAL = "historical";
    const ENDPOINT_CONVERT = "convert";
    const ENDPOINT_TIMEFRAME = "timeframe";
    const ENDPOINT_CHANGE = "change";

    public function __construct($config)
    {
        $this->access_key = $config['cl_api_access_key'];
        $this->base_uri = $config['cl_api_base_uri'];

        $this->client = new Client([
            'base_uri' => $this->base_uri . "/api",
            'query' => ['access_key' => $this->access_key]
        ]);

        $this->decoder = new JsonDecoder;
    }

    public function __get($endpoint)
    {
        $result = null;

        switch($endpoint)
        {
            case static::ENDPOINT_LIVE:
            case static::ENDPOINT_HISTORICAL:
            case static::ENDPOINT_CONVERT:
            case static::ENDPOINT_TIMEFRAME:
            case static::ENDPOINT_CHANGE:
                $response = $this->client->get($endpoint);
                $result = $this->decoder->decode($response->getBody());
                break;
        }

        return $result;
    }
}