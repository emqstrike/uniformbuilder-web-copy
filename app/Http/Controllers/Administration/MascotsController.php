<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
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
        $mascotName = $request->input('name');
        $code = $request->input('code');
        $layersProperties = $request->input('layers_properties');

        $data = [
            'name' => $mascotName,
            'code' => $code,
            'layers_properties' => $layersProperties
        ];

        $id = null;
        if (!empty($request->input('mascot_id')))
        {
            $id = $request->input('mascot_id');
            $data['id'] = $id;
        }
        //dd($data);

        $myJson = json_decode($layersProperties, true);

        $materialFolder = $mascotName;
        try
        {
            $materialOptionFile = $request->file('icon');
            if (!is_null($materialOptionFile))
            {
                if ($materialOptionFile->isValid())
                {
                    $filename = Random::randomize(12);
                    $data['icon'] = FileUploader::upload(
                                                            $materialOptionFile,
                                                            $mascotName,
                                                            'material_option',
                                                            "materials",
                                                            "{$materialFolder}/{$filename}.png"
                                                        );
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/materials')
                            ->with('message', 'There was a problem uploading your files');
        }

        // Upload images from the layers
        try
        {
            $mascotLayerFiles = $request->file('ma_image');
            $ctr = 1;
            foreach ($mascotLayerFiles as $mascotLayerFile) {
                if (!is_null($mascotLayerFile))
                {
                    if ($mascotLayerFile->isValid())
                    {
                        $filename = Random::randomize(12);
                        $myJson[(string)$ctr]['filename'] = FileUploader::upload(
                                                                    $mascotLayerFile,
                                                                    $mascotName,
                                                                    'material_option',
                                                                    "materials",
                                                                    "{$materialFolder}/{$filename}.png"
                                                                );
                    }
                }
                $ctr++;
            }
        }

        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/materials')
                            ->with('message', 'There was a problem uploading your files');
        }
        $data['layers_properties'] = json_encode($myJson, JSON_UNESCAPED_SLASHES);

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
