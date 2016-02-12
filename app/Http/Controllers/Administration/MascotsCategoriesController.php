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

class MascotsCategoriesController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        // $factories = $this->client->getFactories();

        return view('administration.mascots.mascots-categories', [
            // 'factories' => $factories
        ]);
    }

    public function editMascotsCategoriesForm($id)
    {
        $factory = $this->client->getFactory($id);
        return view('administration.factories.factory-edit', [
            'factory' => $factory
        ]);
    }

    public function addMascotsCategoryForm()
    {
        return view('administration.mascots.mascots-categories-create');
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        
        $id = null;
        
        if (!empty($request->input('mascots_category_id')))
        {
            $id = $request->input('mascots_category_id');
        }
        // Is the Factory Name taken?
        // if ($this->client->isFactoryTaken($code, $id))
        // {
        //     return Redirect::to('administration/factories')
        //                     ->with('message', 'Factory already exist');
        // }

        $data = [
            'name' => $name
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
            return Redirect::to('administration/mascots')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/mascots')
                            ->with('message', $response->message);
        }
    }
}
