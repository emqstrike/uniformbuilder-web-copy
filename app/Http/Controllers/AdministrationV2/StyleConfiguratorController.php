<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StyleConfiguratorController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    /**
     * Colors
     */
    public function index($active_brand = null)
    {
        if($active_brand == null) {
            $active_brand = "prolook";
        }

        $colors = $this->client->getColors($active_brand);
        
        return view('administration-lte-2.colors.colors', [
            'colors' => $colors,
            'active_brand' => $active_brand
        ]);
    }

}
