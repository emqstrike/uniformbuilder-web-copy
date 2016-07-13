<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;
use App\APIClients\MascotsCategoriesAPIClient as APIClient;

use App\APIClients\MascotsGroupsCategoriesAPIClient;

class MascotsCategoriesController extends Controller
{
    protected $client;
    protected $MascotsGroupCategoriesClient;
    public function __construct(APIClient $apiClient,MascotsGroupsCategoriesAPIClient $MascotsGroupsCategoriesAPIClient)
    {
        $this->client = $apiClient;
        $this->MascotsGroupCategoriesClient = $MascotsGroupsCategoriesAPIClient;
    }

    public function index()
    {
        $mascots_categories = $this->client->getMascotCategories();
   
        return view('administration.mascots.mascots-categories', [
            'mascots_categories' => $mascots_categories
        ]);
    }

    public function editMascotsCategoriesForm($id)
    {

        $mascot_category = $this->client->getMascotCategory($id);
        $mascots_groups_categories = $this->MascotsGroupCategoriesClient->getMascotsGroupsCategories();


        return view('administration.mascots.mascots-categories-edit', [
            'mascot_category' => $mascot_category->mascot_category,
             'mascots_groups_categories' => $mascots_groups_categories
        ]);
    }

    public function addMascotsCategoryForm()
    {
         $mascots_groups_categories = $this->MascotsGroupCategoriesClient->getMascotsGroupsCategories();
        return view('administration.mascots.mascots-categories-create', [
           'mascots_groups_categories' => $mascots_groups_categories
        ]);
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        $group = $request->input('group');
        
        $id = null;

        if (!is_null($request->input('mascots_category_id')))
        {
            $id = $request->input('mascots_category_id');
        }
        // Is the Category Name taken?
        if ($this->client->isMascotCategoryTaken($name, $id))
        {
            return Redirect::to('administration/mascots_categories')
                            ->with('message', 'Mascot Category already exist')
                            ->with('alert-class', 'danger');
        }

        $data = [
            'name' => $name,
            'mascots_group_category_id' => $group,
            'id' => $id
        ];

        $response = null;
        if (!empty($id))
        {
            Log::info('Attempts to update Mascot Category#' . $id);
            $data['id'] = $id;
            $response = $this->client->updateMascotCategory($data);
        }
        else
        {
            
            Log::info('Attempts to create a new Mascot Category ' . json_encode($data));
            $response = $this->client->createMascotCategory($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/mascots_categories')
                            ->with('message', 'Successfully saved changes')
                            ->with('alert-class', 'success');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/mascots_categories')
                            ->with('message', $response->message);
        }
    }
}
