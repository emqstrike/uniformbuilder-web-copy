<?php
namespace App\Qx7APIClient;

use Illuminate\Support\Facades\Log;


class Qx7StyleRequestClient extends Qx7APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllStyleRequests()
    {
        $response = $this->get('style_requests/formatted');
        $result = $this->decoder->decode($response->getBody());

        if ($result->success) {
            return $result->style_requests;
        }

        return null;
    }
}