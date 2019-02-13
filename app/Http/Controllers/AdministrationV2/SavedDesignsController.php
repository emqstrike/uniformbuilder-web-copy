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

}
