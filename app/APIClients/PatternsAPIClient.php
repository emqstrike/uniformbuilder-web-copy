<?php
namespace App\APIClients;

class PatternsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getPattern($id)
    {
        $response = $this->get('pattern/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->pattern;
        }
        return null;
    }

    public function getPatterns()
    {
        $response = $this->get('patterns');
        $result = $this->decoder->decode($response->getBody());

        $patterns = [];
        if ($result->success)
        {
            $patterns = $result->patterns;
        }
        return $patterns;
    }

    public function isPatternExist($name, $id = null)
    {
        $response = $this->getPatternByName($name);
        $pattern = ($response->success) ? $response->pattern : null;

        if (!is_null($pattern) && !is_null($id))
        {
            $compare = $this->getpattern($id);
            if ($pattern->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($pattern);
    }

    public function getPatternByName($name)
    {
        $response = $this->get('pattern/name/' . $name);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->pattern;
        }
        return null;
    }

    public function createPattern($data)
    {
        $response = $this->post('pattern', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updatePattern($data)
    {
        $response = $this->post('pattern/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getPatternsBySport($active_sport)
    {
        $response = $this->get('patterns/sport/'.$active_sport);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->patterns;
        }
        return null;
    }
}
