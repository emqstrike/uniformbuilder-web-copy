<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\ColorsAPIClient;
use App\APIClients\MascotsAPIClient as APIClient;

class MascotsController extends Controller
{
    protected $client;
    protected $colorsClient;

    public function __construct(
        APIClient $apiClient,
        ColorsAPIClient $colorsAPIClient
    )
    {
        $this->client = $apiClient;
        $this->colorsClient = $colorsAPIClient;
    }

    public function index()
    {
        $mascots = $this->client->getMascots();
        return view('administration.mascots.mascots', [
            'mascots' => $mascots
        ]);
    }

    // public function editPatternForm($id)
    // {
    //     $colors = $this->colorsClient->getColors();
    //     $pattern = $this->client->getPattern($id);

    //     return view('administration.patterns.pattern-edit', [
    //         'pattern' => $pattern,
    //         'color' => $colors
    //     ]);
    // }

    public function addMascotForm()
    {
        $colorsAPIClient = new \App\APIClients\ColorsAPIClient();
        $colors = $colorsAPIClient->getColors();

        // return view('administration.mascots.mascot-create');
        return view('administration.mascots.mascot-create', [
            'colors' => $colors
        ]);
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        $code = $request->input('code');

        $data = [
            'name' => $name,
            'code' => $code
        ];

        $id = null;
        if (!empty($request->input('mascot_id')))
        {
            $id = $request->input('mascot_id');
            $data['id'] = $id;
        }
        // Is the Mascot Name taken?
        // if ($this->client->isMascotExist($name, $id))
        // {
        //     return Redirect::to('administration/mascots')
        //                     ->with('message', 'Mascot already exist');
        // }
        
        $response = null;
        if (!empty($id))
        {
            Log::info('Attempts to update Mascot#' . $id);
            $response = $this->client->updateMascot($data);
        }
        else
        {
            Log::info('Attempts to create a new Mascot ' . json_encode($data));
            $response = $this->client->createMascot($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/mascots')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/mascots')
                            ->with('message', $response->message);
        }
    }
}
