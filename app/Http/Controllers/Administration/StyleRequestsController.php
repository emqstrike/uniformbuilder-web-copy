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
use App\APIClients\StyleRequestsAPIClient as APIClient;
use App\APIClients\MaterialsAPIClient;

class StyleRequestsController extends Controller
{
    protected $client;
    protected $materialsClient;

    public function __construct(APIClient $apiClient, MaterialsAPIClient $materialsClient)
    {

        $this->client = $apiClient;
        $this->materialsClient = $materialsClient;

    }

    public function index()
    {
        $style_requests = $this->client->getAll();

        return view('administration.style-requests.style-requests', [
            'style_requests' => $style_requests
        ]);

    }

    public function styleViewer()
    {
        $materials = $this->materialsClient->getFootballMaterials();
// dd($materials);
        return view('administration.style-requests.style-viewer', [
            'materials' => $materials
        ]);

    }

   
    // public function create()
    // {
    //     $fonts = $this->fontClient->getAllFonts();
        
    //     $colors = $this->colorsClient->getColors();
   
       
    //      return view('administration.accents.accent-create', [
    //         'fonts' => $fonts,
    //         'colors' => $colors
    //     ]);

    // }

    // public function store(Request $request){

    //     $accentName = $request->input('name');
    //     $accentCode = $request->input('code');
    //     $thumbnail_path = $request->input('thumbnail_path');
    //     $accentProperties = $request->input('accent_properties');
    //     $secondary_id = $request->input('secondary_id');
    //        if(!isset($secondary_id)){
    //         $secondary_id = 0;

    //        }
        
    //       $accentId = null;
    //     if (!empty($request->input('accent_id')))
    //     {
    //         $accentId = $request->input('accent_id');
    //     }

    //     $data = [
    //         'name' => $accentName,
    //         'code' => $accentCode,
    //         'thumbnail_path' => $thumbnail_path,
    //         'accent_properties' => $accentProperties,
    //         'secondary_id' => $secondary_id
    //     ];

    //     $materialFolder = $accentName;

    //     try {
    //         $accentThumbnailPath = $request->file('thumbnail_path');
    //         if (isset($accentThumbnailPath))
    //         {
    //             if ($accentThumbnailPath->isValid())
    //             {
    //                 $filename = Random::randomize(12);
    //                 // $data['thumbnail_path'] = "qx";
    //                 $data['thumbnail_path'] = FileUploader::upload(
    //                                                 $accentThumbnailPath,
    //                                                 $accentName,
    //                                                 'material_option',
    //                                                 "materials",
    //                                                 "{$accentName}/{$filename}.png"
    //                                             );
    //             }
    //         }

    //     }
    //     catch (S3Exception $e)
    //     {
    //         $message = $e->getMessage();
    //         return Redirect::to('/administration/accents')
    //                         ->with('message', 'There was a problem uploading your files');
    //     }


        
    //        $response = null;

    //     if (!empty($accentId))
    //     {
    //         Log::info('Attempts to update accent#' . $accentId);

    //         $data['id'] = $accentId;
       
    //         $response = $this->client->updateAccent($data);
    //         return Redirect::to('administration/accent/edit/' . $data['id'])
    //                         ->with('message', $response->message);
    //     }
    //     else
    //     {
    //         Log::info('Attempts to create a new accent ' . json_encode($data));
    //         $response = $this->client->createAccent($data);
    //     }

    //     if ($response->success)
    //     {
    //         Log::info('Success');
    //         return Redirect::to('administration/accents')
    //                         ->with('message', $response->message);
    //     }
    //     else
    //     {
    //         Log::info('Failed');
    //         return Redirect::to('administration/accents')
    //                         ->with('message', 'There was a problem saving the accent');
    //     }





    // }

    //   public function editAccentForm($id)
    // {


    //     $accent = $this->client->getAccent($id);

     

    //     $fonts = $this->fontClient->getAllFonts();
    //     $colors = $this->colorsClient->getColors();

    //     return view('administration.accents.accent-edit', [
    //     'accent' => $accent,
    //        'fonts' => $fonts,
    //        'colors' => $colors
    //     ]);

        

    // }



}
