<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use Aws\S3\Exception\S3Exception;
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
            'models' => $models
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
        if (!empty($request->input('base_model_id')))
        {
            $modelId = $request->input('base_model_id');
            $data['id'] = $modelId;
        }

        // Does the Base Model Name exist
        if ($this->client->isModelNameTaken($modelName, $modelId))
        {
            return Redirect::to('administration/models')
                            ->with('message', 'Model name already exist');
        }

        try
        {
            $baseModelFile = $request->file('base_model_path');
            if (isset($baseModelFile))
            {
                if ($baseModelFile->isValid())
                {
                    $data['base_model_path'] = FileUploader::upload(
                        $baseModelFile,
                        $modelName,
                        'base_model',
                        'models'
                    );
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/models')
                            ->with('message', 'There was a problem uploading your files');
        }

        $response = null;
        if (!empty($modelId))
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
