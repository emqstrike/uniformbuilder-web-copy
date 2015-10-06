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


        return view('administration.databackup.data_backup', [
            // viewindex
        ]);
    }

    public function backup()
    {
        $user = $this->client->getUser($id);
        return view('administration.users.user-edit', [
            'user' => $user
        ]);
    }

    

}
