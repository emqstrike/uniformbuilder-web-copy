<?php

namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;
use App\APIClients\UniformDesignSetsAPIClient as APIClient;

class UniformDesignSetsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $designs = $this->client->getDesignSets();

        return view('administration.designs.designs', [
            'designs' => $designs
        ]);
    }

    public function editDesignForm($id)
    {
        $design = $this->client->getDesign($id);
        return view('administration.designs.design-edit', [
            'design' => $design
        ]);
    }

    public function addDesignForm()
    {
        return view('administration.designs.design-create');
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        $data = [
            'name' => $name
        ];

        $id = null;
        if (!empty($request->input('uniform_design_id')))
        {
            $id = $request->input('uniform_design_id');
            $data['id'] = $id;
        }
        // Is the Design Name taken?
        if ($this->client->isDesignTaken($name, $id))
        {
            return Redirect::to('administration/designs')
                            ->with('message', 'Uniform design already exist');
        }

        if ($request->input('type'))
        {
            $data['type'] = $request->input('type');
        }

        $response = null;
        if (!empty($userId))
        {
            Log::info('Attempts to update Uniform Design#' . $id);
            $response = $this->client->updateDesign($data);
        }
        else
        {
            Log::info('Attempts to create a new Uniform Design ' . json_encode($data));
            $response = $this->client->createDesign($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/designs')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/designs')
                            ->with('message', $response->message);
        }
    }

}
