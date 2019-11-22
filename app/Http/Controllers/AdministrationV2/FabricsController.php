<?php

namespace App\Http\Controllers\AdministrationV2;

use App\APIClients\FabricsAPIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Illuminate\Http\Request;

class FabricsController extends Controller
{
    protected $client;

    public function __construct(FabricsAPIClient $fabricsClient)
    {
        $this->client = $fabricsClient;
    }

    public function index()
    {
        $fabrics = $this->client->getFabrics();

        return view('administration-lte-2.fabrics.index', compact('fabrics'));
    }

    public function create()
    {
        return view('administration-lte-2.fabrics.create');
    }

    public function edit($id)
    {
        $fabric = $this->client->getFabric($id);

        return view('administration-lte-2.fabrics.edit', compact('fabric'));
    }

    public function store(Request $request)
    {
        $data = $request->all();

        try {
            $thumbnail = $request->file('thumbnail');
            $name = Random::randomize(8);

            if (isset($thumbnail) && $thumbnail->isValid()) {
                $data['thumbnail'] = FileUploader::upload($thumbnail,  $data['material_abbreviation'], 'thumbnail', "fabrics/{$name}");
            }
        } catch (S3Exception $e) {
            $message = $e->getMessage();

            return redirect()->route('v1_create_fabric')->with('message', 'There was a problem uploading your files');
        }

        $response = $this->client->createFabric($data);

        if ($response->success) {
            return redirect()->route('v1_index_fabrics')->with('message', 'Successfully saved changes');
        }

        return redirect()->route('v1_create_fabric')->with('message', $response->message);
    }

    public function update(Request $request)
    {
        $data = $request->all();

        try {
            $thumbnail = $request->file('new_thumbnail');
            $name = Random::randomize(8);

            if (isset($thumbnail) && $thumbnail->isValid()) {
                $data['thumbnail'] = FileUploader::upload($thumbnail,  $data['material_abbreviation'], 'thumbnail', "fabrics/{$name}");
            }
        } catch (S3Exception $e) {
            $message = $e->getMessage();

            return redirect()->route('v1_create_fabric')->with('message', 'There was a problem uploading your files');
        }

        $response = $this->client->updateFabric($data);

        if ($response->success) {
            return redirect()->route('v1_index_fabrics')->with('message', 'Successfully saved changes');
        }

        return redirect()->route('v1_create_fabric')->with('message', $response->message);
    }
}
