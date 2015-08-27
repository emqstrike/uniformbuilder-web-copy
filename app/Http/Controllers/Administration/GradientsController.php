<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\GradientsAPIClient as APIClient;

class GradientsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    /**
     * Gradients
     */
    public function index()
    {
        $gradients = $this->client->getGradients();

        return view('administration.gradients.gradients', [
            'gradients' => $gradients
        ]);
    }

    public function addGradientForm()
    {
        return view('administration.gradients.gradient-create');
    }

    public function editGradientForm($id)
    {
        $gradient = $this->client->getGradient($id);
        return view('administration.gradients.gradient-edit', [
            'gradient' => $gradient
        ]);
    }

    public function store(Request $request)
    {
        $gradientName = $request->input('name');

        $gradientId = null;
        if (!empty($request->input('gradient_id')))
        {
            $gradientId = $request->input('gradient_id');
        }

        // Gradient Name should be Unique
        if ($this->client->isExist($gradientName, $gradientId))
        {
            return Redirect::to('administration/gradients')
                        ->with('message', 'Gradient name already exists');
        }

        $data = [
            'name' => $gradientName
        ];

        try
        {
            $gradientFile = $request->file('gradient_path');
            if (isset($gradientFile))
            {
                if ($gradientFile->isValid())
                {
                    $data['gradient_path'] = FileUploader::upload(
                        $gradientFile,
                        $gradientName,
                        'gradient',
                        'gradients'
                    );
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/gradients')
                            ->with('message', 'There was a problem uploading your files');
        }

        $response = null;
        if (!empty($gradientId))
        {
            Log::info('Attempts to update Gradient#' . $gradientId);
            $data['id'] = $gradientId;
            $response = $this->client->updateGradient($data);
        }
        else
        {
            Log::info('Attempts to create a new Gradient ' . json_encode($data));
            $response = $this->client->createGradient($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/gradients')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/gradients')
                            ->with('message', 'There was a problem saving your gradient');
        }
    }
}
