<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;

use App\APIClients\MascotsGroupsCategoriesAPIClient as APIClient;

class MascotsGroupsCategoriesController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $mascots_groups_categories = $this->client->getMascotsGroupsCategories();

        return view('administration.mascots.mascots-groups-categories', [
            'mascots_groups_categories' => $mascots_groups_categories
        ]);
    }

    public function editMascotsGroupsCategoriesForm($id)
    {


       $mascot_group_category = $this->client->getMascotGroupCategory($id);
   

        return view('administration.mascots.mascots-groups-categories-edit', [
            'mascot_group_category' => $mascot_group_category->mascot_group_category
        ]);
    }

    public function addMascotsGroupsCategoryForm()
    {
        return view('administration.mascots.mascots-groups-categories-create');
    }

    public function store(Request $request)
    { 
      

        $name = $request->input('name');

        $id = null;

        if (!is_null($request->input('mascot_group_category_id')))
        {
            $id = $request->input('mascot_group_category_id');

        }
        // Is the Category Name taken?
     

        if ($this->client->isMascotGroupCategoryTaken($name, $id))
        {
        

            return Redirect::to('administration/mascots_groups_categories')
                            ->with('message', 'Mascot Category already exist')
                            ->with('alert-class', 'danger');
        }

        $data = [
            'name' => $name,
            'id' => $id
        ];
        

        $response = null;
        if (!empty($id))
        {

            Log::info('Attempts to update Mascot Group Category#' . $id);
            $data['id'] = $id;
            $response = $this->client->updateMascotGroupCategory($data);
        }
        else
        {
            
                 Log::info('Attempts to create a new Mascot Group Category ' . json_encode($data));
            $response = $this->client->createMascotGroupCategory($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/mascots_groups_categories')
                            ->with('message', 'Successfully saved changes')
                            ->with('alert-class', 'success');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/mascots_groups_categories')
                            ->with('message', $response->message);
        }
    }
}
