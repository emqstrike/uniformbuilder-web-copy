<?php

namespace App\Http\Controllers\AdministrationV2;

use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\MascotSizesAPIClient as APIClient;

class MascotSizesController extends Controller
{
    protected $client;

    public function __construct(
        APIClient $apiClient
    )
    {
        $this->client = $apiClient;
    }
    /**
     * MascotSizes
     */
    public function index()
    {
        $mascot_sizes = $this->client->getMascotSizes();
        return view('administration-lte-2.mascots.mascot-sizes', [
            'mascot_sizes' => $mascot_sizes
        ]);
    }

}
