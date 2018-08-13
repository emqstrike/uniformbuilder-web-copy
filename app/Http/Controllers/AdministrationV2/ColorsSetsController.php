<?php
namespace App\Http\Controllers\AdministrationV2;

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

        return view('administration-lte-2.colors.colors-sets', [
            'colors_sets' => $colors_sets,
            'colors' => $colors
        ]);
    }

    public function addColorsSetForm()
    {
        $colors = $this->colorsClient->getColors();
        return view('administration-lte-2.colors.colors-set-create', [
            'colors' => $colors
        ]);
    }

    public function editColorsSetForm($id)
    {
        $colors_sets = $this->client->show($id);
        $colors = $this->colorsClient->getColors();
        return view('administration-lte-2.colors.colors-set-edit', [
            'colors' => $colors,
            'colors_sets' => $colors_sets
        ]);
    }

    public function store(Request $request){
        $id = $request->input('id');
        $name = $request->input('name');
        $uniformType = $request->input('uniform_type');
        $colors = $request->input('colors');

        $data = [
            'id' => $id,
            'name' => $name,
            'uniform_type' => $uniformType,
            'colors' => $colors
        ];

        $response = null;

        if (!empty($id))
        {
            Log::info('Attempts to update Colors Set#' . $id);
            $response = $this->client->updateColorsSet($data);
        }
        else
        {
            Log::info('Attempts to create a new Colors Set' . json_encode($data));
            $response = $this->client->createColorsSet($data);
        }
        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('/administration/v1-0/colors_sets')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/v1-0/colors_sets')
                            ->with('message', 'There was a problem saving.');
        }


    }

}
