<?php

namespace App\Utilities;

use App\Utilities\GoogleAnalyticsAPI;
use Carbon\Carbon;

class Analytics
{
    private $analytics;

    public function __construct()
    {
        $this->analytics = new GoogleAnalyticsAPI('service');
        $this->analytics->auth->setClientId(env('GOOGLE_ANALYTICS_CLIENT_ID')); 
        $this->analytics->auth->setEmail(env('GOOGLE_ANALYTICS_EMAIL'));
        $this->analytics->auth->setPrivateKey(storage_path() . '/analytics/' . env('GOOGLE_ANALYTICS_P12_FILE'));

        $auth = $this->analytics->auth->getAccessToken();

        try {
            if ($auth['http_code'] == 200) {
                $accessToken = $auth['access_token'];
                $tokenExpires = $auth['expires_in'];
                $tokenCreated = time();

                $this->analytics->setAccessToken($accessToken);
                $this->analytics->setAccountId('ga:' . env('GOOGLE_ANALYTICS_ACCOUNT_ID'));
            }
        } catch (Exception $e) {
            Log::info($e);
        }
    }

    public function getEndpointVisits($startDate, $endDate)
    {
        $params = array(
            'metrics' => 'ga:pageviews, ga:serverResponseTime',
            'dimensions' => 'ga:country, ga:pagePath, ga:date',
            'start-date' => $startDate,
            'end-date' => $endDate,
            'sort' => 'ga:date',
            'max-results' => '50000'
        ); 

        $data = [];
      
        $results = $this->analytics->query($params)['rows'];

        foreach ($results as $result) {
            $date = Carbon::parse($result[2])->format('M d, Y');

            $data[] = array(
                'country' => $result[0],
                'endpoint' => $result[1],
                'date' => $date,
                'page_views' => $result[3],
                'response_time' => $result[4]
            );
        }

        return $data;
    }
}