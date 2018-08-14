<?php
namespace App\APIClients;

use Illuminate\Support\Facades\Log;

class DeveloperAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function truncateTable($tableName)
    {
        if (env('APP_ENV') == 'testing') {
           $this->get('truncate-table/' . $tableName);
        }

        return false;
    }
}