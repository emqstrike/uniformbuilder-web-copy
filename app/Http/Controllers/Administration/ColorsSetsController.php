<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\ColorsSetsAPIClient as APIClient;

class ColorsSetsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    /**
     * Colors
     */
    public function index()
    {
        $colors_sets = $this->client->getColorsSets();

        return view('administration.colors.colors-sets', [
            'colors_sets' => $colors_sets
        ]);
    }

    public function addColorsSetForm()
    {
        return view('administration.colors.colors-set-create');
    }

}
