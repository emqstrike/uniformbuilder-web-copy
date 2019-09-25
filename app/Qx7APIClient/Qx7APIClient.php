<?php
namespace App\Qx7APIClient;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Webmozart\Json\JsonDecoder;
use GuzzleHttp\Exception\ClientException;
use \Session;

class Qx7APIClient extends Client
{
    protected $decoder;

    public function __construct()
    {
        $settings = [
            'base_uri' => getenv('QX7_HOST') . '/api/'
        ];

        parent::__construct($settings);
        $this->decoder = new JsonDecoder();
    }
}
