<?php
namespace App\APIClients;

class UniformDesignSetsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getDesignSet($id)
    {
        $response = $this->get('design_set/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->design_set;
        }
        return null;
    }

    public function getDesignSets()
    {
        $response = $this->get('design_sets');
        $result = $this->decoder->decode($response->getBody());

        $designs = [];
        if ($result->success)
        {
            $designs = $result->design_sets;
        }
        return $designs;
    }

    public function isDesignTaken($code, $id = null)
    {
        $design_set = $this->getByCode($code);

        if (!is_null($design_set) && !is_null($id))
        {
            $compare = $this->getDesignSet($id);
            if ($design_set->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($design_set);
    }

    public function getByCode($code)
    {
        $response = $this->get('design_set/code/' . $code);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->design_set;
        }
        return null;
    }

    public function createDesignSet($data)
    {
        $response = $this->post('design_set', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateDesignSet($data)
    {
        $response = $this->post('design_set/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }
}