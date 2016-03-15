<?php
namespace App\APIClients;

class ApplicationsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    // public function getFactory($id)
    // {
    //     $response = $this->get('factory/' . $id);
    //     $result = $this->decoder->decode($response->getBody());
    //     if ($result->success)
    //     {
    //         return $result->factory;
    //     }
    //     return null;
    // }

    public function getApplications()
    {
        $response = $this->get('applications');
        $result = $this->decoder->decode($response->getBody());

        $applications = [];
        if ($result->success)
        {
            $applications = $result->applications;
        }
        return $applications;
    }

    // public function isFactoryTaken($code, $id = null)
    // {
    //     $response = $this->get('factory/code/' . $code);
    //     $result = $this->decoder->decode($response->getBody());

    //     $factory = null;
    //     if ($result->success)
    //     {
    //         $factory = $result->factory;
    //     }

    //     if (!is_null($factory) && !is_null($id))
    //     {
    //         $compare = $this->getFactory($id);
    //         if ($factory->id == $compare->id)
    //         {
    //             return false;
    //         }
    //     }
    //     return !is_null($factory);
    // }

    // public function getFactoryByCode($code)
    // {
    //     $response = $this->get('factory/code/' . $code);
    //     $result = $this->decoder->decode($response->getBody());

    //     if ($result->success)
    //     {
    //         return $result->factory;
    //     }
    //     return null;
    // }

    // public function createFactory($data)
    // {

    //     $response = $this->post('factory', [
    //         'json' => $data
    //     ]);
        
    //     return $this->decoder->decode($response->getBody());
    // }

    // public function updateFactory($data)
    // {
    //     $response = $this->post('factory/update', [
    //         'json' => $data
    //     ]);

    //     return $this->decoder->decode($response->getBody());
    // }

}