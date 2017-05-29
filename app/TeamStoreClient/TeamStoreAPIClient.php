<?php 

namespace App\TeamStoreClient;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Log;
use Webmozart\Json\JsonDecoder;
use \Session;

class TeamStoreAPIClient extends Client
{
    public function __construct()
    {
        $settings = [
            'base_uri' => 'http://' . getenv('TEAM_STORE_API_BASE') . '/'
        ];

        $accessToken = Session::get('accessToken');

        if (! is_null($accessToken)) {
            $settings['headers'] = ['accessToken' => $accessToken];
        }

        parent::__construct($settings);
        $this->decoder = new JsonDecoder();
    }
}