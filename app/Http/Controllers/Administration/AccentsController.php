<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\AccentsAPIClient as APIClient;


use App\APIClients\FontsAPIClient;
use App\APIClients\ColorsAPIClient;

class AccentsController extends Controller
{
    protected $client;

    protected $fontClient;

    protected $colorsClient;

    public function __construct(APIClient $apiClient, FontsAPIClient $fontsAPIClient ,ColorsAPIClient $colorsAPIClient)
    {

        $this->client = $apiClient;

        $this->fontClient = $fontsAPIClient;

        $this->colorsClient = $colorsAPIClient;

    }
    public function index()
    {
        $accents = $this->client->getAllAccents();
       
        return view('administration.accents.accents', [
            'accents' => $accents
        ]);

    }

   
    public function create()
    {
        $fonts = $this->fontClient->getAllFonts();
        
        $colors = $this->colorsClient->getColors();
   
       
         return view('administration.accents.accent-create', [
            'fonts' => $fonts,
            'colors' => $colors
        ]);

    }

    public function store(Request $request){

        $accentName = $request->input('name');
        $accentCode = $request->input('code');

        if ($request->has('thumbnail_path')) {
            $thumbnail_path = $request->input('thumbnail_path');
        } else {
            $thumbnail_path = $request->input('thumbnail_path_uploader');
        }
        
        $accentProperties = $request->input('accent_properties');
        $secondary_id = $request->input('secondary_id');

        if ( !isset($secondary_id)) {
            $secondary_id = 0;
        }
        
        $accentId = null;

        if (! empty($request->input('accent_id'))) {
            $accentId = $request->input('accent_id');
        }

        $data = [
            'name' => $accentName,
            'code' => $accentCode,
            'thumbnail_path' => $thumbnail_path,
            'accent_properties' => $accentProperties,
            'secondary_id' => $secondary_id
        ];

        $materialFolder = $accentName;

        try {
            if (! is_null($request->thumbnail_path_uploader)) {
                $accentThumbnailPath = $request->file('thumbnail_path_uploader');

                if (isset($accentThumbnailPath)) {
                    if ($accentThumbnailPath->isValid()) {
                        $filename = Random::randomize(12);
                        // $data['thumbnail_path'] = "qx";
                        $data['thumbnail_path'] = FileUploader::upload(
                            $accentThumbnailPath,
                            $accentName,
                            'material_option',
                            "materials",
                            "{$accentName}/{$filename}.png"
                        );
                    }
                }
            }
        } catch (S3Exception $e) {
            $message = $e->getMessage();
            return Redirect::to('/administration/accents')
                            ->with('message', 'There was a problem uploading your files');
        }

       $response = null;

        if (!empty($accentId)) {
            Log::info('Attempts to update accent#' . $accentId);

            $data['id'] = $accentId;
       
            $response = $this->client->updateAccent($data);
            return Redirect::to('administration/accent/edit/' . $data['id'])
                            ->with('message', $response->message);
        } else {
            Log::info('Attempts to create a new accent ' . json_encode($data));
            $response = $this->client->createAccent($data);
        }

        if ($response->success) {
            Log::info('Success');
            return Redirect::to('administration/accents')
                            ->with('message', $response->message);
        } else {
            Log::info('Failed');
            return Redirect::to('administration/accents')
                            ->with('message', 'There was a problem saving the accent');
        }
    }

     public function editAccentForm($id)
    {
        $accent = $this->client->getAccent($id);
        $fonts = $this->fontClient->getAllFonts();
        $colors = $this->colorsClient->getColors();

        return view('administration.accents.accent-edit', [
        'accent' => $accent,
           'fonts' => $fonts,
           'colors' => $colors
        ]);
    }



}
