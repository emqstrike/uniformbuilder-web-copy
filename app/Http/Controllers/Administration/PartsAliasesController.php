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
use App\APIClients\BlockPatternsAPIClient;
use App\APIClients\PartsAliasesAPIClient as APIClient;



class PartsAliasesController extends Controller
{
    protected $client;
    protected $uniformCategoriesClient;
    protected $priceItemTemplatesAPIClient;
    protected $blockPatternsAPIClient;

    public function __construct(
        APIClient $apiClient,
        UniformCategoriesAPIClient $uniformCategoriesClient,
        PriceItemTemplatesAPIClient $priceItemTemplatesAPIClient,
        BlockPatternsAPIClient $blockPatternsAPIClient
    )
    {

        $this->client = $apiClient;
        $this->uniformCategoriesClient = $uniformCategoriesClient;
        $this->priceItemTemplatesAPIClient = $priceItemTemplatesAPIClient;
        $this->blockPatternsAPIClient = $blockPatternsAPIClient;

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
        $block_patterns = $this->blockPatternsAPIClient->getBlockPatterns();
        $types = ['Upper', 'Lower' ];

        return view('administration.parts-aliases.parts-aliases-create', [
            'price_item_templates' => $price_item_templates,
            'sports' => $sports,
            'block_patterns' => $block_patterns,
            'types' => $types,
        ]);
    }

    public function store(Request $request)
    {
        $partId = $request->input('partId');

        $description = $request->input('description');
        $sport = $request->input('uniform_category_id');
        $price = $request->input('price_item_template_id');
        $block = $request->input('block_pattern_id'); 
        $properties = $request->input('properties');
        $type = $request->input('type');  
          

        $data = [
            'part_id' => $partId,
            'description' => $description,
            'uniform_category_id' => $sport,
            'price_item_template_id' => $price,
            'block_pattern_id' => $block,
            'properties' => $properties,
            'type' => $type

        ];
        $response=null;
        // Log::info('Attempts to create a new Part ', json_encode($data))
        //$response = $this->client->createPartsAliases($data);

        if (!empty($partId))
        {
            Log::info('Attempts to update Material#' . $partId);
            $response = $this->client->updatePartsAliases($data);
        }
        else
        {
            Log::info('Attempts to create a new Material ' . json_encode($data));
            $response = $this->client->createPartsAliases($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('/administration/parts_aliases')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/parts_aliases')
                            ->with('message', 'There was a problem saving.');
        }

    }

    public function edit($id)
    {
        $part = $this->client->show($id);
        $sports = $this->uniformCategoriesClient->getUniformCategories();
        $price_item_templates = $this->priceItemTemplatesAPIClient->getAll();
        $block_patterns = $this->blockPatternsAPIClient->getBlockPatterns();
        $types = [ 'Upper', 'Lower' ];

        return view('administration.parts-aliases.edit-parts-aliases', compact('part' , 'sports', 'price_item_templates', 'block_patterns', 'types'));
    }
 
}

