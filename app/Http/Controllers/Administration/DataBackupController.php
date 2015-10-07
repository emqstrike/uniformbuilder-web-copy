<?php
namespace App\Http\Controllers\Administration;

use Crypt;
use Session;
use Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\DataBackupAPIClient as APIClient;

class DataBackupController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        // $users = $this->client->getUsers();

        return view('administration.databackup.data_backup', [
            // 'users' => $users
        ]);
    }

    public function backup()
    {
    return view('administration.databackup.backup', [
            // 'users' => $users
        ]);
    }


}
