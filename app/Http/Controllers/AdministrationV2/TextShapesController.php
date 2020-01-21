<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\TextShapesAPIClient as APIClient;

class TextShapesController extends Controller
{

    public function __construct(
        APIClient $apiClient
    )
    {
        $this->client = $apiClient;
    }

    public function index()
    {

        $text_shapes = $this->client->getAllTextShapes();
        return view('administration-lte-2.text-shapes.index', [
            'text_shapes' => $text_shapes
        ]);
    }
}