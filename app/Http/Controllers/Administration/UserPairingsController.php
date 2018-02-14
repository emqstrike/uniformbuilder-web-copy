<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\Random;
use App\Http\Controllers\Controller;
use App\APIClients\UserPairingsAPIClient as APIClient;

class UserPairingsController extends Controller
{
    protected $client;

    public function __construct(
        APIClient $apiClient
    )
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $user_pairings = $this->client->getAll();
        return view('administration.user-pairings.user-pairings', [
            'user_pairings' => $user_pairings
        ]);
    }

    public function getPairingItemsByID($id)
    {
        $user_pairings = $this->client->getPairingItemsByID($id);
        $user_pairing_items = $user_pairings->user_pairing_items;
        return view('administration.user-pairings.user-pairing-items', [
            'user_pairings' => $user_pairings,
            'user_pairing_items' => $user_pairing_items
        ]);
    }

}
