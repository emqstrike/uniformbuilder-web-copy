<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\UniformCategoriesAPIClient;
use App\APIClients\PriceItemTemplatesAPIClient;
use App\APIClients\PartsAliasesAPIClient as APIClient;

class PartsAliasesController extends Controller
{
    protected $client;
    protected $uniformCategoriesClient;
    protected $priceItemTemplatesAPIClient;

    public function __construct(
        APIClient $apiClient,
        UniformCategoriesAPIClient $uniformCategoriesClient,
        PriceItemTemplatesAPIClient $priceItemTemplatesAPIClient
    )
    {

        $this->client = $apiClient;
        $this->uniformCategoriesClient = $uniformCategoriesClient;
        $this->priceItemTemplatesAPIClient = $priceItemTemplatesAPIClient;

    }

    public function index()
    {
        $parts_aliases = $this->client->getAll();

        return view('administration.parts-aliases.parts-aliases', [
            'parts_aliases' => $parts_aliases
        ]);
    }

    public function addForm()
    {
        $sports = $this->uniformCategoriesClient->getUniformCategories();
        $price_item_templates = $this->priceItemTemplatesAPIClient->getAll();

        return view('administration.parts-aliases.parts-aliases-create', [
            'price_item_templates' => $price_item_templates,
            'sports' => $sports,
        ]);
    }

}
