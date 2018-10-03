<?php
namespace App\APIClients;

class ColorsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function isColorExist($name, $id = null)
    {
        $color = $this->getColorByName($name);
        if (!is_null($color) && !is_null($id))
        {
            $compare = $this->getColor($id);
            if ($color->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($color);
    }

    public function isColorCodeExist($code, $id = null)
    {
        $color = $this->getColorByCode($code);
        if (!is_null($color) && !is_null($id))
        {
            $compare = $this->getColor($id);
            if ($color->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($color);
    }

    public function createColor($data)
    {
        $response = $this->post('color', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function updateColor($data)
    {
        $response = $this->post('color/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateAllColors($data)
    {
        $response = $this->post('colors/updateAll', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getColors($brand = null)
    {
        $response = $this->get('colors/' .$brand );
        $result = $this->decoder->decode($response->getBody());

        $colors = [];
        if ($result->success)
        {
            $colors = $result->colors;
        }
        return $colors;
    }

    public function getColor($id)
    {
        $response = $this->get('color/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->color;
        }
        return null;
    }

    public function getColorByName($name)
    {
        $response = $this->get('color/name/' . $name);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->color;
        }
        return null;
    }

    public function getColorByCode($code)
    {
        $response = $this->get('color/code/' . $code);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->color;
        }
        return null;
    }
}
