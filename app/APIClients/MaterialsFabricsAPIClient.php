<?php
namespace App\APIClients;

class MaterialsFabricsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function createMaterialsFabrics($data)
    {
        $response = $this->post('materials_fabric', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }
     public function updateMaterialsFabric($data)
    {  
        $response = $this->post('materials_fabric/update', [

            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }


    public function getAllMaterialsFabrics()
    {
        $response = $this->get('materials_fabrics');
        $result = $this->decoder->decode($response->getBody());
    
        $materials_fabrics = [];
        if ($result->success)
        {
              
            $materials_fabrics = $result->materials_fabrics;
        }
        
        return $materials_fabrics;
    }

    public function getMaterialsFabric($id)
    {
        $response = $this->get('materials_fabric/' . $id);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {

            return $result->materials_fabric;
        }
        return null;
    }
}