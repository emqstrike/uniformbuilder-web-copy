<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;
use App\APIClients\FactoriesAPIClient as APIClient;

class FactoriesController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $factories = $this->client->getFactories();

        return view('administration.factories.factories', [
            'factories' => $factories
        ]);
    }

    public function editFactoryForm($id)
    {
        $factory = $this->client->getFactory($id);
        return view('administration.factories.factory-edit', [
            'factory' => $factory
        ]);
    }

    public function addFactoryForm()
    {
        return view('administration.factories.factory-create');
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        //$fid = $request->input('factory_id');
        
        $id = null;
        
        if (!empty($request->input('factory_id')))
        {
            $id = $request->input('factory_id');
            //$data['id'] = $id;
        }
        // Is the Factory Name taken?
        if ($this->client->isFactoryTaken($name, $id))
        {
            return Redirect::to('administration/factories')
                            ->with('message', 'Factory already exist');
        }

        /*if ($request->input('type'))
        {
            $data['type'] = $request->input('type');
        }*/

        $data = [
            'name' => $name
        ];
        //dd($id);
        $response = null;
        if (!empty($id))
        {
            Log::info('Attempts to update Factory#' . $id);
            $data['id'] = $id;
            $data['name'] = $name;
            $response = $this->client->updateFactory($data);
        }
        else
        {
            Log::info('Attempts to create a new Factory ' . json_encode($data));
            $response = $this->client->createFactory($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/factories')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/factories')
                            ->with('message', $response->message);
        }
    }
}
