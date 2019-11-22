<?php

namespace App\Http\Controllers\AdministrationV2;

use App\APIClients\SavedDesignsAPIClient as APIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use JasonGrimes\Paginator;
use Session;

class SavedDesignsController extends Controller
{
    protected $client;
    protected $categoriesClient;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index($currentPage = null)
    {
        if (is_null($currentPage)) {
            $currentPage = 1;
        }

        $queryString = $_SERVER['QUERY_STRING'];

        $filters = [];

        if (Input::get('name')) {
            if (Input::get('name') != '') {
                $filters['name'] = Input::get('name');
            }
        }

        if (Input::get('sport')) {
            if (Input::get('sport') != 'all') {
                $filters['sport'] = Input::get('sport');
            }
        }

        if (Input::get('blockPattern')) {
            if (Input::get('blockPattern') != 'all') {
                $filters['blockPattern'] = Input::get('blockPattern');
            }
        }

        if (Input::get('neckOption')) {
            if (Input::get('neckOption') != 'all') {
                $filters['neckOption'] = Input::get('neckOption');
            }
        }

        if (Input::get('user')) {
            if (Input::get('user') != 'all') {
                $filters['user'] = Input::get('user');
            }
        }

        if (Input::get('range')) {
            $filters['range'] = Input::get('range');
        }

        if (Input::get('search')) {
            $filters['search'] = Input::get('search');
        }
        
        $results = $this->client->getPaginated($currentPage, $filters);
        $savedDesigns = $results['saved_designs'];
        $total = $results['total'];
        $sports = $results['sports'];
        $block_patterns = $results['block_patterns'];
        $users = $results['users'];
        $neck_options = $results['neck_options'];

        foreach ($savedDesigns as $savedDesign) {
            $savedDesign->created_at = date('M-d-Y', strtotime($savedDesign->created_at));
        }

        $paginator = new Paginator($total, 30, $currentPage, route('saved_designs'));

        return view('administration-lte-2.saved-designs.index', compact(
            'savedDesigns',
            'paginator',
            'sports',
            'block_patterns',
            'users',
            'neck_options',
            'filters',
            'queryString'
        ));
    }

    public function standAlone($currentPage = null)
    {
        if (is_null($currentPage)) {
            $currentPage = 1;
        }

        $queryString = $_SERVER['QUERY_STRING'];

        $filters = [];

        if (Input::get('name')) {
            if (Input::get('name') != '') {
                $filters['name'] = Input::get('name');
            }
        }

        if (Input::get('sport')) {
            if (Input::get('sport') != 'all') {
                $filters['sport'] = Input::get('sport');
            }
        }

        if (Input::get('blockPattern')) {
            if (Input::get('blockPattern') != 'all') {
                $filters['blockPattern'] = Input::get('blockPattern');
            }
        }

        if (Input::get('neckOption')) {
            if (Input::get('neckOption') != 'all') {
                $filters['neckOption'] = Input::get('neckOption');
            }
        }

        if (Input::get('user')) {
            if (Input::get('user') != 'all') {
                $filters['user'] = Input::get('user');
            }
        }

        if (Input::get('range')) {
            $filters['range'] = Input::get('range');
        }

        $results = $this->client->getPaginated($currentPage, $filters);
        $savedDesigns = $results['saved_designs'];
        $total = $results['total'];
        $sports = $results['sports'];
        $block_patterns = $results['block_patterns'];
        $users = $results['users'];
        $neck_options = $results['neck_options'];

        foreach ($savedDesigns as $savedDesign) {
            $savedDesign->created_at = date('M-d-Y', strtotime($savedDesign->created_at));
        }

        $paginator = new Paginator($total, 30, $currentPage, route('saved_designs_stand_alone'));

        return view('administration-lte-2.saved-designs.standalone-saved-designs', compact(
            'savedDesigns',
            'paginator',
            'sports',
            'block_patterns',
            'users',
            'neck_options',
            'filters',
            'queryString'
        ));
    }

    public function loginForm(Request $request)
    {
        $errorMessage = null;
        if ($request->session()->has('error_message'))
        {
            $errorMessage = $request->session()->get('error_message', '');
        }
        return view('administration.auth.saved-designs-login', [
            'error_message' => $errorMessage
        ]);
    }

    public function savedDesignsLogin(Request $request)
    {

        $password = $request->input('password');

        try
        {
            if ($password == config('customizer.access_saved_designs'))
            {
                Session::put('accessSavedDesigns', $password);
                return redirect('saved_designs');
            }
            else
            {
                Session::flash('flash_message', 'Access Denied');
                return redirect('saved_design/login');
            }

        }
        catch (ClientException $e)
        {
            $error = $e->getMessage();
            Log::info('Login Attempt Error : ' . $error);
        }
    }

}
