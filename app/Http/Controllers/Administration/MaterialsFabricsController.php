<?php
namespace Customizer\Http\Controllers\Administration;

use \Session;
use \Redirect;
use Customizer\Http\Requests;
use Customizer\Utilities\Log;
use Illuminate\Http\Request;
use Customizer\Utilities\FileUploader;
use Customizer\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use Customizer\Http\Controllers\Controller;

use Customizer\APIClients\MaterialsFabricsAPIClient as APIClient;


use Customizer\APIClients\FactoriesAPIClient;

class MaterialsFabricsController extends Controller
{
    protected $client;
    protected $factoriesClient;


    public function __construct(FactoriesAPIClient $factoriesAPIClient, APIClient $apiClient)
    {

        $this->client = $apiClient;

        $this->factoriesClient = $factoriesAPIClient;


    }
    public function index()
    {
        $materials_fabrics = $this->client->getAllMaterialsFabrics();
      
        return view('administration.materials.material-fabrics', [
            'materials_fabrics' => $materials_fabrics
        ]);

    }
    public function create()
    {
        $factories = $this->factoriesClient->getFactories();
  
       
         return view('administration.materials.material-fabric-create', [
            'factories' => $factories   
        ]);

    }
    public function store(Request $request){

        $material_id = $request->input('material_id');
        $material_name = $request->input('material_name');
        $factory_id = $request->input('factory_id');



           // if(!isset($secondary_id)){
           //  $secondary_id = 0;

           // }
        
          // $accentId = null;
        // if (!empty($request->input('accent_id')))
        // {
        //     $accentId = $request->input('accent_id');
        // }

        $data = [
            'material_id' => $material_id,
            'material' => $material_name,
            'factory_id' => $factory_id
          
        ];


        $response = null;

        // if (!empty($accentId))
        // {
        //     Log::info('Attempts to update accent#' . $accentId);

        //     $data['id'] = $accentId;
       
        //     $response = $this->client->updateAccent($data);
        //     return Redirect::to('administration/accent/edit/' . $data['id'])
        //                     ->with('message', $response->message);
        // }
        // else
        // {
            Log::info('Attempts to create a new Material Fabric ' . json_encode($data));
            $response = $this->client->createMaterialsFabrics($data);
        // }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/materials_fabrics')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/materials_fabrics')
                            ->with('message', 'There was a problem saving the materials fabric');
        }





    }

      public function editMaterialFabricForm($id)
    {

        $materials_fabric = $this->client->getMaterialsFabric($id);

        $factories = $this->factoriesClient->getFactories();

        return view('administration.materials.material-fabric-edit', [
        'factories' => $factories,
        'materials_fabric' => $materials_fabric   
        ]);

        

    }

   
  




}
