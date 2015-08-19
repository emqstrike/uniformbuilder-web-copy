<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\FabricsAPIClient as APIClient;

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
        $fabricName = $request->input('name');
        $fabricCode = $request->input('code');

        $data = [
            'name' => $fabricName,
            'code' => $fabricCode
        ];

        $fabricId = null;
        if (!empty($request->input('fabric_id')))
        {
            $fabricId = $request->input('fabric_id');
            $data['id'] = $fabricId;
        }

        // Does the Fabric Name exist
        if ($this->client->isFabricNameTaken($fabricName, $fabricId))
        {
            return Redirect::to('administration/fabrics')
                            ->with('message', 'Fabric name already exist');
        }
        // Does the Fabric Name exist
        if ($this->client->isFabricCodeTaken($fabricCode, $fabricId))
        {
            return Redirect::to('administration/fabrics')
                            ->with('message', 'Fabric code already exist');
        }

        try
        {
            $fabricFile = $request->file('fabric_path');
            if (isset($fabricFile))
            {
                if ($fabricFile->isValid())
                {
                    $data['fabric_path'] = FileUploader::upload(
                        $fabricFile,
                        $fabricName,
                        'fabric',   // Type
                        'fabrics'   // S3 Folder
                    );
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/fabrics')
                            ->with('message', 'There was a problem uploading your files');
        }

        $response = null;
        if (!empty($fabricId))
        {
            $response = $this->client->updateFabric($data);
        }
        else
        {
            $response = $this->client->createFabric($data);
        }

        if ($response->success)
        {
            return Redirect::to('administration/fabrics')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            return Redirect::to('administration/fabrics')
                            ->with('message', $response->message);
        }
    }

}
