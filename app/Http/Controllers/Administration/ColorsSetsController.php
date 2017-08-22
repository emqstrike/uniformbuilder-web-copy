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

    public function editColorsSetForm($id)
    {
        $colors_sets = $this->client->show($id);
        $colors = $this->colorsClient->getColors();
        // dd($colors);
        return view('administration.colors.colors-set-edit', [
            'colors' => $colors,
            'colors_sets' => $colors_sets
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
