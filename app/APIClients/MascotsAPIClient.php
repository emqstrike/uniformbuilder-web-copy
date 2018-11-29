<?php
namespace App\APIClients;

class MascotsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getMascots()
    {
        $response = $this->get('mascots');
        $result = $this->decoder->decode($response->getBody());

        $mascots = [];
        if ($result->success)
        {
            $mascots = $result->mascots;
        }

        return $mascots;
    }

    public function isMascotExist($name, $id = null)
    {
        $mascot = $this->getMascotByName($name);
        if (!is_null($mascot) && !is_null($id))
        {
            $compare = $this->getMascot($id);
            if ($mascot->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($mascot);
    }

    public function getMascotByName($name)
    {
        $response = $this->get('mascot/name/' . $name);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->mascot;
        }
        return null;
    }

    public function getMascotByCategory($category)
    {
        $response = $this->get('mascot/category/' . $category);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->mascots;
        }
        return null;
    }

    public function getMascot($id)
    {
        $response = $this->get('mascot/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->mascot->mascot;
        }

        return null;
    }

    public function createMascot($data)
    {
        $response = $this->post('mascot', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function createArtwork($data)
    {
        $response = $this->post('mascot/artwork', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateMascot($data)
    {
        $response = $this->post('mascot/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getMascotBySport($active_sport)
    {
        $response = $this->get('mascots/sport/'.$active_sport);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->mascots;
        }
        return null;
    }

    public function getFilteredMascots($active_sport, $active_category)
    {
        $response = $this->get('mascots/filter/'.$active_sport.'/'.$active_category);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->mascots;
        }
        return null;
    }
}
