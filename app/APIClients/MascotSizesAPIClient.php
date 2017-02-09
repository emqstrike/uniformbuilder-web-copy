<?php
namespace App\APIClients;

class MascotSizesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    // public function isMascotSizeExist($name, $id = null)
    // {
    //     $mascot_size = $this->getMascotSizeByName($name);
    //     if (!is_null($mascot_size) && !is_null($id))
    //     {
    //         $compare = $this->getMascotSize($id);
    //         if ($mascot_size->id == $compare->id)
    //         {
    //             return false;
    //         }
    //     }
    //     return !is_null($mascot_size);
    // }

    // public function isMascotSizeCodeExist($code, $id = null)
    // {
    //     $mascot_size = $this->getMascotSizeByCode($code);
    //     if (!is_null($mascot_size) && !is_null($id))
    //     {
    //         $compare = $this->getMascotSize($id);
    //         if ($mascot_size->id == $compare->id)
    //         {
    //             return false;
    //         }
    //     }
    //     return !is_null($mascot_size);
    // }

    public function createMascotSize($data)
    {

     
        $response = $this->post('mascot_size', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateMascotSize($data)
    {
      
        $response = $this->post('mascot_size/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getMascotSizes()
    {
        $response = $this->get('mascot_sizes');
        $result = $this->decoder->decode($response->getBody());

        $mascot_sizes = [];
        if ($result->success)
        {
            $mascot_sizes = $result->mascot_sizes;
        }
        return $mascot_sizes;
    }

    // public function getDefaultMascotSizes()
    // {
    //     return $this->getMascotSizeByType('default');
    // }

    // public function getMascotSizeByType($type = 'default')
    // {
    //     $response = $this->get('mascot_sizes/' . $type);
    //     $result = $this->decoder->decode($response->getBody());

    //     $mascot_sizes = [];
    //     if ($result->success)
    //     {
    //         $mascot_sizes = $result->mascot_sizes;
    //     }
    //     return $mascot_sizes;
    // }

    public function getMascotSize($id)
    {
        $response = $this->get('mascot_size/' . $id);

        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->mascot_size;
        }
        return null;
    }

    // public function getMascotSizeByName($name)
    // {
    //     $response = $this->get('mascot_size/name/' . $name);
    //     $result = $this->decoder->decode($response->getBody());
    //     if ($result->success)
    //     {
    //         return $result->mascot_size;
    //     }
    //     return null;
    // }

    // public function getMascotSizeByCode($code)
    // {
    //     $response = $this->get('mascot_size/code/' . $code);
    //     $result = $this->decoder->decode($response->getBody());

    //     if ($result->success)
    //     {
    //         return $result->mascot_size;
    //     }
    //     return null;
    // }
}