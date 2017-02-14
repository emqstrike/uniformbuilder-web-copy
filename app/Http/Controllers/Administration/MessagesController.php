<?php

namespace Customizer\Http\Controllers\Administration;

use \Redirect;
use Customizer\Http\Requests;
use Customizer\Utilities\Log;
use Illuminate\Http\Request;
use Customizer\Http\Controllers\Controller;
use Customizer\APIClients\MessagesAPIClient as APIClient;
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

        return $messages;
        // return view('administration.messages.messages', [
        //     'messages' => $messages
        // ]);
    }

    public function composeForm()
    {
        return view('administration.messages.message-compose');
    }

}
