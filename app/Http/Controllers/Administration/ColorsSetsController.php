<?php
namespace Customizer\Http\Controllers\Administration;

use \Session;
use \Redirect;
use Customizer\Http\Requests;
use Customizer\Utilities\Log;
use Illuminate\Http\Request;
use Customizer\Http\Controllers\Controller;
use Customizer\APIClients\ColorsAPIClient;
use Customizer\APIClients\ColorsSetsAPIClient as APIClient;

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
        $colors = $this->colorsClient->getColors();
        
        return view('administration.colors.colors-sets', [
            'colors_sets' => $colors_sets,
            'colors' => $colors
        ]);
    }

    public function addColorsSetForm()
    {
        $colors = $this->colorsClient->getColors();
        // dd($colors);
        return view('administration.colors.colors-set-create', [
            'colors' => $colors
        ]);
    }

    public function store(Request $request){
        $name = $request->input('name');
        $uniformType = $request->input('uniform_type');
        $colors = $request->input('colors');

        $data = [
            'name' => $name,
            'uniform_type' => $uniformType,
            'colors' => $colors
        ];

        $response = $this->client->createColorsSet($data);
        // dd($data);
    }

}
