<?php
namespace App\APIClients;

class TailsweepsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function createTailsweep($data)
    {
        $response = $this->post('tailsweep', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }
     public function updateTailsweep($data)
    {  
        // dd($data);
        $response = $this->post('tailsweep/update', [

            'json' => $data
       ]);
       

        return $this->decoder->decode($response->getBody());
    }
       public function getAllTailsweeps()
    {
        $response = $this->get('tailsweeps');
        $result = $this->decoder->decode($response->getBody());

        $tailsweeps = [];
        if ($result->success)
        {
            $tailsweeps = $result->tailsweeps;
        }
        
        return $tailsweeps;
    }
     public function getTailsweep($id)
    {
        $response = $this->get('tailsweep/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {

            return $result->tailsweep;
        }
        return null;
    }
}