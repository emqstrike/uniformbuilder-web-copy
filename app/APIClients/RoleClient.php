<?php 

namespace App\APIClients;

use Illuminate\Support\Facades\Log;

class RoleClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getRoles()
    {
        $response = $this->get('roles');
        return $this->decoder->decode($response->getBody());
    }
}