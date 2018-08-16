<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\MessagesAPIClient as APIClient;
use Session;

class MessagesController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function getUserMessages()
    {
        $user_id = Session::get('userId');
        $messages = $this->client->getByRecipient($user_id);

        return view('administration.messages.messages', [
            'messages' => $messages
        ]);
    }

    public function composeForm()
    {
        return view('administration.messages.message-compose');
    }

    public function delete($id)
    {
        $result = $this->client->delete($id);
    }
}
