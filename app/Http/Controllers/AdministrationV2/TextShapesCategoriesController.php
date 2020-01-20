<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\TextShapesCategoriesAPIClient as APIClient;

class TextShapesCategoriesController extends Controller
{

    public function __construct(
        APIClient $apiClient
    )
    {
        $this->client = $apiClient;
    }

    public function index()
    {

        $text_shapes_categories = $this->client->get(1);
        dd($text_shapes_categories);
        return view('administration-lte-2.text-shapes-categories.index', [
            'text_shapes_categories' => $text_shapes_categories
        ]);

    }
}
