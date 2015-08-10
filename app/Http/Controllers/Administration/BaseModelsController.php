<?php

namespace App\Http\Controllers\Administration;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\BaseModelsAPIClient as APIClient;

class BaseModelsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $models = $this->client->getModels();

        return view('administration.models.models', [
            'models' => $models,
            'api_host' => env('API_HOST')
        ]);
    }

    public function editModelForm($id)
    {
        $model = $this->client->getModel($id);
        return view('administration.models.model-edit', [
            'model' => $model
        ]);
    }

    public function addModelForm()
    {
        return view('administration.models.model-create');
    }

    public function store(Request $request)
    {
        $modelName = $request->input('name');

        $data = [
            'name' => $modelName
        ];

        $modelId = null;
        if (!empty($request->input('model_id')))
        {
            $modelId = $request->input('model_id');
            $data['id'] = $modelId;
        }

        // Does the User exist
        if ($this->client->isModelNameTaken($modelName, $modelId))
        {
            return Redirect::to('administration/models')
                            ->with('message', 'Model name already exist');
        }

        $response = null;
        if (!empty($userId))
        {
            $response = $this->client->updateModel($data);
        }
        else
        {
            $response = $this->client->createModel($data);
        }

        if ($response->success)
        {
            return Redirect::to('administration/models')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            return Redirect::to('administration/models')
                            ->with('message', $response->message);
        }
    }
}
