<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;

use App\APIClients\MaterialsFabricsAPIClient as APIClient;

use App\APIClients\FabricsAPIClient;
use App\APIClients\FactoriesAPIClient;

class MaterialsFabricsController extends Controller
{
    protected $client;
    protected $factoriesClient;
    protected $fabricsClient;

    public function __construct(
        APIClient $apiClient,
        FactoriesAPIClient $factoriesAPIClient,
        FabricsAPIClient $fabricsAPIClient
        )
    {

        $this->client = $apiClient;
        $this->factoriesClient = $factoriesAPIClient;
        $this->fabricsClient = $fabricsAPIClient;


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
        $fabrics = $this->fabricsClient->getFabrics();
       
         return view('administration.materials.material-fabric-create', [
            'factories' => $factories,
            'fabrics' => $fabrics
        ]);

    }
    public function store(Request $request){

        $material_id = $request->input('material_id');
        $factory_id = $request->input('factory_id');
        $data = [
            'material_id' => $material_id,
            'factory_id' => $factory_id
        ];

        $mfabricId = null;
        if (!empty($request->input('id')))
        {
            $mfabricId = $request->input('id');
            $data['id'] = $mfabricId;   
        }

        $response = null;
        if (!empty($mfabricId))
        {
             Log::info('Attempts to update Material Fabric#' . $mfabricId);
             $response = $this->client->updateMaterialsFabric($data);
        }
        else
        {
            Log::info('Attempts to create a new Material Fabric ' . json_encode($data));
            $response = $this->client->createMaterialsFabrics($data);
        }
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
        $fabrics = $this->fabricsClient->getFabrics();

        return view('administration.materials.material-fabric-edit', [
        'factories' => $factories,
        'materials_fabric' => $materials_fabric,
        'fabrics' => $fabrics  
        ]);

        

    }

   
  




}
