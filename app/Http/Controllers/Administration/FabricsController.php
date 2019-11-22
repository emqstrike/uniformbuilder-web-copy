<?php

namespace App\Http\Controllers\Administration;

use App\APIClients\FabricsAPIClient as APIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Utilities\FileUploader;
use App\Utilities\Log;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use Illuminate\Http\Request;
use \Redirect;

class FabricsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $fabrics = $this->client->getFabrics();
        return view('administration.fabrics.fabrics', [
            'fabrics' => $fabrics
        ]);
    }

    public function editForm($id)
    {
        $fabric = $this->client->getFabric($id);
        return view('administration.fabrics.fabric-edit', [
            'fabric' => $fabric
        ]);
    }

    public function addForm()
    {
        return view('administration.fabrics.fabric-create');
    }

    public function store(Request $request)
    {
        $fabricMaterialID = $request->input('factory_material_id');
        $fabricMaterial = $request->input('material');
        $fabricAbbreviation = $request->input('material_abbreviation');

        $data = [
            'factory_material_id' => $fabricMaterialID,
            'material' => $fabricMaterial,
            'material_abbreviation' => $fabricAbbreviation,
            'description' => $request->input('description')
        ];

        try {
            // Thumbnail Files
            $thumbnail = $request->file('thumbnail');
            $name = Random::randomize(8);
            if (isset($thumbnail))
            {
                if ($thumbnail->isValid())
                {
                    $data['thumbnail'] = FileUploader::upload(
                                                    $thumbnail,
                                                    $fabricAbbreviation,
                                                    'thumbnail',
                                                    "fabrics/{$name}"
                                                );
                }
            }

        } catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/fabrics')
                            ->with('message', 'There was a problem uploading your files');
        }

        $fabricId = null;
        if (!empty($request->input('fabric_id')))
        {
            $fabricId = $request->input('fabric_id');
            $data['id'] = $fabricId;
        }


        $response = null;
        if (!empty($fabricId))
        {
            Log::info('Attempts to update Fabric#' . $fabricId);
            $response = $this->client->updateFabric($data);
        }
        else
        {
            Log::info('Attempts to create a new Fabric ' . json_encode($data));
            $response = $this->client->createFabric($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/fabrics')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/fabrics')
                            ->with('message', $response->message);
        }
    }

}
