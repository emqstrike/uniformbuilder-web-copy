<?php

namespace App\Http\Controllers\AdministrationV2;

use \Redirect;
use \Session;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Utilities\Log;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use App\Utilities\FileUploader;
use App\Utilities\FileUploaderV2;
use App\Http\Controllers\Controller;
use JasonGrimes\Paginator;
use Illuminate\Support\Facades\Input;
use App\APIClients\InksoftDesignsAPIClient as APIClient;



class InksoftDesignsController extends Controller
{
    protected $client;

    public function __construct(
        APIClient $apiClient
    )
    {
        $this->client = $apiClient;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($current_page = null)
    {
        $user_id = null;

        if (is_null($current_page)) {
            $current_page = 1;
        }

        if (Input::get('user')) {
            if (Input::get('user') != 'all') {
                $user_id = Input::get('user');
            }
        }

        $queryString = $_SERVER['QUERY_STRING'];

        $result = $this->client->getPaginated($current_page, $user_id);
        $inksoft_designs = $result['inksoft_designs'];
        $total = $inksoft_designs->total;
        $users = $result['users'];
        $paginator = new Paginator($total, 30, $current_page, route('inksoft_designs'));

        return view('administration-lte-2.inksoft-designs.inksoft-designs', [
            'inksoft_designs' => $inksoft_designs,
            'paginator' => $paginator,
            'current_page' => $current_page,
            'users' => $users,
            'active_user' => $user_id,
            'queryString' => $queryString
        ]);

    }

    public function searchPage()
    {
        return view('administration-lte-2.inksoft-designs.inksoft-designs-search');
    }
}
