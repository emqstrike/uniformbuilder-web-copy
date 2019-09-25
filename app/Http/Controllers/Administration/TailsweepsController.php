<?php
namespace App\Http\Controllers\Administration;

use App\APIClients\BrandingsAPIClient;
use App\APIClients\TailsweepsAPIClient as APIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Utilities\FileUploader;
use App\Utilities\Log;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use \Redirect;
use \Session;

class TailsweepsController extends Controller
{
    protected $client;
    protected $brandingClient;

    public function __construct(APIClient $apiClient, BrandingsAPIClient $brandingClient)
    {
        $this->client = $apiClient;
        $this->brandingClient = $brandingClient;
    }

    public function index()
    {
        $brands = $this->brandingClient->getAll();

        $filters = [];

        if (Input::get('brand')) {
            $filters['brand'] = Input::get('brand');
        }

        $tailsweeps = $this->client->getAllTailsweeps($filters);

        return view('administration.tailsweeps.tailsweeps', [
            'tailsweeps' => $tailsweeps,
            'brands' => $brands,
            'filters' => $filters
        ]);
    }

   
    public function create()
    {
        $brands = $this->brandingClient->getAll();

        return view('administration.tailsweeps.tailsweep-create', compact('brands'));
    }

    public function store(Request $request) {
        $tailsweepName = $request->input('name');
        $tailsweepCode = $request->input('code');
        $tailsweepTitle = $request->input('title');
        $tailsweepThumbnail = $request->input('thumbnail');
        $tailsweepShort = $request->input('short');
        $tailsweepMedium = $request->input('medium');
        $tailsweepLong = $request->input('long');

        $tailsweepId = null;

        if (!empty($request->input('tailsweep_id'))) {
            $tailsweepId = $request->input('tailsweep_id');
        }
     
        $data = [
            'name' => $tailsweepName,
            'code' => $tailsweepCode,
            'title' => $tailsweepTitle,
            'thumbnail' => $tailsweepThumbnail,
            'short' => $tailsweepShort,
            'medium' => $tailsweepMedium,
            'long' => $tailsweepLong,
            'brand_id' => $request->brand_id
        ];


        $tailsweepFolder = $tailsweepName;

        try {
            $tailsweepThumbnailPath = $request->file('thumbnail_path');

            if (isset($tailsweepThumbnailPath)) {
                if ($tailsweepThumbnailPath->isValid()) {
                    $filename = Random::randomize(12);
     
                    $data['thumbnail'] = FileUploader::upload(
                        $tailsweepThumbnailPath,
                        $tailsweepName,
                        'tailsweep',
                        "tailsweeps",
                        "{$tailsweepName}/{$filename}.png"
                    );
                }
            }
        } catch (S3Exception $e) {
            $message = $e->getMessage();
            return Redirect::to('/administration/tailsweeps')->with('message', 'There was a problem uploading your files');
        }

        
       $response = null;

        if (! empty($tailsweepId)) {
            Log::info('Attempts to update tailsweep#' . $tailsweepId);

            $data['id'] = $tailsweepId;

            $response = $this->client->updateTailsweep($data);

            return Redirect::to('administration/tailsweep/edit/' . $data['id'])->with('message', $response->message);
        }
        else
        {
            Log::info('Attempts to create a new tailsweep ' . json_encode($data));
            $response = $this->client->createTailsweep($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/tailsweeps')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/tailsweeps')
                            ->with('message', 'There was a problem saving the tailsweep');
        }





    }

    public function editTailsweepForm($id) {
        $tailsweep = $this->client->getTailsweep($id);
        $brands = $this->brandingClient->getAll();


        return view('administration.tailsweeps.tailsweep-edit', [
            'tailsweep' => $tailsweep,
            'brands' => $brands
        ]);
    }
}
