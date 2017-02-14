<?php
namespace Customizer\APIClients;

class BaseModelsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getModel($id)
    {
        $response = $this->get('model/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->model;
        }
        return null;
    }

    public function getModels()
    {
        $response = $this->get('models');
        $result = $this->decoder->decode($response->getBody());

        $models = [];
        if ($result->success)
        {
            $models = $result->models;
        }
        return $models;
    }

    public function isModelNameTaken($name, $id = null)
    {
        $response = $this->get('model/name/' . $name);
        $result = $this->decoder->decode($response->getBody());

        $model = null;
        if ($result->success)
        {
            $model = $result->model;
        }

        if (!is_null($model) && !is_null($id))
        {
            $compare = $this->getmodel($id);
            if ($model->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($model);
    }

    public function getModelByName($name)
    {
        $response = $this->get('model/name/' . $name);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->model;
        }
        return null;
    }

    public function createModel($data)
    {
        $response = $this->post('model', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateModel($data)
    {
        $response = $this->post('model/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }
}