<?php
namespace App\APIClients;

class MascotsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    // public function getPattern($id)
    // {
    //     $response = $this->get('pattern/' . $id);
    //     $result = $this->decoder->decode($response->getBody());
    //     if ($result->success)
    //     {
    //         return $result->pattern;
    //     }
    //     return null;
    // }

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

    // public function isPatternExist($name, $id = null)
    // {
    //     $response = $this->getPatternByName($name);
    //     $pattern = ($response->success) ? $response->pattern : null;

    //     if (!is_null($pattern) && !is_null($id))
    //     {
    //         $compare = $this->getpattern($id);
    //         if ($pattern->id == $compare->id)
    //         {
    //             return false;
    //         }
    //     }
    //     return !is_null($pattern);
    // }

    // public function getPatternByName($name)
    // {
    //     $response = $this->get('pattern/name/' . $name);
    //     $result = $this->decoder->decode($response->getBody());

    //     if ($result->success)
    //     {
    //         return $result->pattern;
    //     }
    //     return null;
    // }

    // public function createPattern($data)
    // {
    //     $response = $this->post('pattern', [
    //         'json' => $data
    //     ]);

    //     return $this->decoder->decode($response->getBody());
    // }

    // public function updatePattern($data)
    // {
    //     $response = $this->post('pattern/update', [
    //         'json' => $data
    //     ]);

    //     return $this->decoder->decode($response->getBody());
    // }
}