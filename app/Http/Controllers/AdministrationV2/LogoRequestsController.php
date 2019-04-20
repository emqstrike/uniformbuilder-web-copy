<?php

namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\LogoRequestsAPIClient as APIClient;
use JasonGrimes\Paginator;
use Illuminate\Support\Facades\Input;

class LogoRequestsController extends Controller
{
   protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index($currentPage = null)
    {
        if (is_null($currentPage)) {
            $currentPage = 1;
        }

        $filters = [];

        if (Input::get('id')) {
            $filters['id'] = Input::get('id');
        }

        if (Input::get('origin')) {
            if (Input::get('origin') != 'all') {
                $filters['origin'] = Input::get('origin');
            }
        }

        if (Input::get('type')) {
            if (Input::get('type') != 'all') {
                $filters['type'] = Input::get('type');
            }
        }

        if (Input::get('client_name')) {
            if (Input::get('client_name') != 'all') {
                $filters['client_name'] = Input::get('client_name');
            }
        }

        if (Input::get('status')) {
            if (Input::get('status') != 'all') {
                $filters['status'] = Input::get('status');
            }
        }

        $results = $this->client->getLogoRequestsPaginated($currentPage, $filters);

        $ctr = 0;

        if ($results['logo_requests']) {
            foreach($results['logo_requests'] as $logo_request) {
                $logo_request->created_at = date('M-d-Y', strtotime($logo_request->created_at));
                $data = json_decode($logo_request->properties, 1);

                if (is_string($data)) {
                    $datax = json_decode($data, 1);
                    $logo_request->properties = $datax;
                } else {
                    $logo_request->properties = $data;
                }
                $ctr++;
            }
        }

        $account_type = Session::get('accountType');
        $user_id = Session::get('userId');
        
        $queryString = $_SERVER['QUERY_STRING'];

        $total = $results['total'];
        $logo_requests = $results['logo_requests'];
        $origins = $results['origins'];
        $types = $results['types'];
        $clientNames = $results['client_names'];
        $statuses = $results['statuses'];

        $paginator = new Paginator($total, 10, $currentPage, route('v1_logo_requests'));

        return view('administration-lte-2.logo-requests.index', compact(
            'logo_requests', 
            'account_type', 
            'user_id',
            'paginator',
            'queryString',
            'origins',
            'types',
            'clientNames',
            'statuses',
            'filters'
        ));
    }
}
