<?php
namespace App\APIClients;

class CutStylesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function isExist($code, $name, $id = null, &$error)
    {
        $styleCode = $this->getByCode($code);
        $flagCode = false;
        if (!is_null($styleCode) && !is_null($id))
        {
            $compare = $this->getCutStyle($id);
            if (!is_null($compare))
            {
                if ($styleCode->id != $compare->id)
                {
                    $error = 'Code already exist';
                    $flagCode = true;
                }
            }
        }

        $flagName = false;
        $styleName = $this->getByName($name);
        if (!is_null($styleName) && !is_null($id))
        {
            $compare = $this->getCutStyle($id);
            if (!is_null($compare))
            {
                if ($styleName->id != $compare->id)
                {
                    $error = 'Name already exist';
                    $flagName = true;
                }
            }
        }
        return $flagCode || $flagName;
    }

    public function createCutStyle($data)
    {
        $response = $this->post('cut', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateCutStyle($data)
    {
        $response = $this->post('cut/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getByType($type)
    {
        $response = $this->get('cuts/' . $type);
        $result = $this->decoder->decode($response->getBody());

        $styles = [];
        if ($result->success)
        {
            $styles = $result->cut_styles;
        }
        return $styles;
    }

    public function getNeckStyles()
    {
        return $this->getByType('neck-styles');
    }

    public function getSleeveStyles()
    {
        return $this->getByType('sleeve-styles');
    }

    public function getPantCuts()
    {
        return $this->getByType('pant-cuts');
    }

    public function getWaistCuts()
    {
        return $this->getByType('waist-cuts');
    }

    public function getSleevePanels()
    {
        return $this->getByType('sleeve-panels');
    }

    public function getShoulderPanels()
    {
        return $this->getByType('shoulder-panels');
    }

    public function getUnderarmPanels()
    {
        return $this->getByType('underarm-panels');
    }

    public function getCutStyle($id)
    {
        $response = $this->get('cut/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->cut_style;
        }
        return null;
    }

    public function getByCode($code)
    {
        $response = $this->get('cut/code/' . $code);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->cut_style;
        }
        return null;
    }

    public function getByName($name)
    {
        $response = $this->get('cut/name/' . $name);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->cut_style;
        }
        return null;
    }
}