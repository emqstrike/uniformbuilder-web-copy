<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\Random;
use App\Http\Controllers\Controller;
use App\APIClients\UniformCategoriesAPIClient;
use App\APIClients\SavedDesignsAPIClient;
use App\APIClients\OrdersAPIClient;
use App\APIClients\BlockPatternsAPIClient;
use App\APIClients\UsersAPIClient;
use App\APIClients\MaterialsAPIClient;

// use App\APIClients\TotalRecordsAPIClient as APIClient;

class TotalRecordsController extends Controller
{
    // protected $client;
    protected $savedDesignsAPIClient;
    protected $uniformCategoriesClient;
    protected $materialsAPIClient;
    protected $ordersAPIClient;
    protected $blockPatternsAPIClient;
    protected $usersAPIClient;


    public function __construct(
        // APIClient $apiClient,
        SavedDesignsAPIClient $savedDesignsAPIClient,
        UniformCategoriesAPIClient $uniformCategoriesClient,
        MaterialsAPIClient $materialsAPIClient,
        OrdersAPIClient $ordersAPIClient,
        BlockPatternsAPIClient $blockPatternsAPIClient,
        UsersAPIClient $usersAPIClient

    )
    {
        // $this->client = $apiClient;
        $this->savedDesignsAPIClient = $savedDesignsAPIClient;
        $this->uniformCategoriesClient = $uniformCategoriesClient;
        $this->materialsAPIClient = $materialsAPIClient;
        $this->ordersAPIClient = $ordersAPIClient;
        $this->blockPatternsAPIClient = $blockPatternsAPIClient;
        $this->usersAPIClient = $usersAPIClient;

    }

    public function index($activeTable = null)
    {
        $sports = $this->uniformCategoriesClient->getUniformCategories();
        $active_table = $activeTable;

        if ($activeTable == 'saved_designs') {
            $table = $this->savedDesignsAPIClient->getAll();
        } else if ($activeTable == 'materials') {
            $table = $this->materialsAPIClient->getMaterials();
        } else if ($activeTable == 'uniform_categories') {
            $table = $this->uniformCategoriesClient->getUniformCategories();
        } else if ($activeTable == 'block_patterns') {
            $table = $this->blockPatternsAPIClient->getBlockPatterns();
        } else if ($activeTable == 'neck_options') {
            $table = $this->blockPatternsAPIClient->getBlockPatterns();
        } else if ($activeTable == 'users') {
            $table = $this->usersAPIClient->getUsers();
        } else if ($activeTable == 'orders') {
            $table = $this->ordersAPIClient->getAllOrdersNoLimit();
        } else {
            $table = '';
        }

        return view('administration.statistics.total-records', [
            'table' => $table,
            'sports' => $sports,
            'active_table' => $active_table
        ]);

    }

}
