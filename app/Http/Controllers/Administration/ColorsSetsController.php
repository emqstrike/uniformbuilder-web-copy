<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\ColorsAPIClient;
use App\APIClients\ColorsSetsAPIClient as APIClient;

class ColorsSetsController extends Controller
{
    protected $client;
    protected $colorsClient;

    public function __construct(
        APIClient $apiClient,
        ColorsAPIClient $colorsAPIClient
    )
    {
        $this->client = $apiClient;
        $this->colorsClient = $colorsAPIClient;
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
        $colors = $this->colorsClient->getColors();
        return view('administration.colors.colors-set-create', [
            'colors' => $colors
        ]);
    }

}
