<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\PointsOfMeasuresAPIClient as APIClient;

class PointsOfMeasuresController extends Controller
{
    protected $client;

    public function __construct(
        APIClient $apiClient
    )
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $points_of_measures = $this->client->getAll();

        return view('administration-lte-2.points-of-measures.points-of-measures', [
            'points_of_measures' => $points_of_measures
        ]);
    }
}
