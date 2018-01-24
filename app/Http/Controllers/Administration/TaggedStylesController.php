<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\Random;
use App\Http\Controllers\Controller;
use App\APIClients\TaggedStylesAPIClient as APIClient;

class TaggedStylesController extends Controller
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
        $tagged_styles = $this->client->getAll();
        return view('administration.tagged-styles.tagged-styles', [
            'tagged_styles' => $tagged_styles
        ]);

    }

    public function totals()
    {
        $tagged_styles = $this->client->getAll();
        return view('administration.tagged-styles.tagged-styles-totals', [
            'tagged_styles' => $tagged_styles
        ]);

    }

}
