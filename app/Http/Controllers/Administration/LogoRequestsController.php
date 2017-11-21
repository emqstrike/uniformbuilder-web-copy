<?php

namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\LogoRequestsAPIClient as APIClient;

class LogoRequestsController extends Controller
{
    protected $client;

    public function __construct(
        APIClient $apiClient
    )
    {
        $this->client = $apiClient;
    }

    public function index(Request $request)
    {
        $logo_requests = $this->client->getLogoRequests();
        $ctr = 0;
        if($logo_requests) {
            foreach($logo_requests as $logo_request)
            {
                $logo_request->created_at = date('M-d-Y', strtotime($logo_request->created_at));
                // $order = $this->client->getOrderByOrderId($logo_request->order_code);

                // if($order){
                $data = json_decode($logo_request->properties, 1);
                if(is_string($data)){
                    $datax = json_decode($data, 1);
                    $logo_request->properties = $datax;
                    // if(empty($datax)){
                    //     unset($properties[$ctr]);
                    // }
                } else {
                    $logo_request->properties = $data;
                    // if(empty($data)){
                    //     unset($properties[$ctr]);
                    // }
                }

                // } else {
                //     unset($properties[$ctr]);
                // }
                // // dd($artworks);
                $ctr++;
            }
        }

        $account_type = Session::get('accountType');
        $user_id = Session::get('userId');
        // dd($logo_requests);
        return view('administration.logo-requests.logo-requests', [
            'logo_requests' => $logo_requests,
            'account_type' => $account_type,
            'user_id' => $user_id
        ]);
    }

    public function updateLogoRequest($data)
    {

        $response = $this->post('logo_request/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

}
