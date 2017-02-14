<?php
namespace Customizer\APIClients;

class LiningsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getLining($id)
    {
        $response = $this->get('lining/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->lining;
        }
        return null;
    }

    public function getLinings()
    {
        $response = $this->get('linings');
        $result = $this->decoder->decode($response->getBody());

        $linings = [];
        if ($result->success)
        {
            $linings = $result->linings;
        }
        return $linings;
    }

    public function getByCode($code)
    {
        $response = $this->get('lining/code/' . $code);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->lining;
        }
        else
        {
            return false;
        }
        return null;
    }

    public function isCodeTaken($code, $id = null)
    {
        $response = $this->get('lining/code/' . $code);
        $result = $this->decoder->decode($response->getBody());

        $lining = null;
        if ($result->success)
        {
            $lining = $result->lining;
        }
        else
        {
            return false;
        }

        if (!is_null($lining) && !is_null($id))
        {
            $compare = $this->getlining($id);
            if ($lining->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($lining);
    }

    public function createLining($data)
    {
        $response = $this->post('lining', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateLining($data)
    {
        $response = $this->post('lining/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }
}