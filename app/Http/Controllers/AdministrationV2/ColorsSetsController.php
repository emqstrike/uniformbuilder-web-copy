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
    public function index($active_brand = null)
    {
        if($active_brand == null) {
            $active_brand = "prolook";
        }
        $colors_sets = $this->client->getColorSetByBrand($active_brand);
        $colors = $this->colorsClient->getColors();

        return view('administration-lte-2.colors.colors-sets', [
            'colors_sets' => $colors_sets,
            'colors' => $colors,
            'active_brand' => $active_brand
        ]);
    }

}
