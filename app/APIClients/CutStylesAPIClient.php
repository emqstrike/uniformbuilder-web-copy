<?php
namespace App\APIClients;

class CutStylesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function isCodeExist($code, $id = null)
    {
        $style = $this->getByCode($code);
        if (!is_null($style) && !is_null($id))
        {
            $compare = $this->getCutStyle($id);
            if ($style->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($style);
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

    public function getNecks()
    {
        return $this->getByType('necks');
    }

    public function getSleeves()
    {
        return $this->getByType('sleeves');
    }

    public function getPants()
    {
        return $this->getByType('pants');
    }

    public function getWaists()
    {
        return $this->getByType('waists');
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
            return $result->style;
        }
        return null;
    }
}