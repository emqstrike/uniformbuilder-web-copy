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
use App\APIClients\SplashImageAPIClient as APIClient;


class SplashImagesController extends Controller
{
    protected $client;
    public function __construct(APIClient $apiClient)
    {

        $this->client = $apiClient;

    }
    public function index()
    {
        $splash_images = $this->client->getAllSplashImages();
       
        return view('administration.splash-images.splash-images', [
            'splash_images' => $splash_images
        ]);

    }

      public function store(Request $request){        
   
        try {
    // $accentName="splashImage";
        $data = [
        // 'thumbnail_path' => null,

        ];

            $flashImageThumbnailPath = $request->file('thumbnail_path');
            if (isset($flashImageThumbnailPath))
            {
                
                if ($flashImageThumbnailPath->isValid())
                {
                    $filename = Random::randomize(12);
                   
                    $data['thumbnail_path'] = FileUploader::upload(
                                                    $flashImageThumbnailPath,
                                                    "splash_img",
                                                    'material_option',
                                                    "materials",
                                                    "{$filename}.png"
                                                );
                      
                }
            }





        }
        catch (S3Exception $e)
        {     
            $message = $e->getMessage();
            return Redirect::to('/administration/splash_images')
                            ->with('message', 'There was a problem uploading your files');
        }

           $response = null;

    
            Log::info('Attempts to create a new splashImage ' . json_encode($data));
       
            $response = $this->client->createSplashImage($data);

            if ($response->success)
            {
                Log::info('Success');
                return Redirect::to('administration/splash_images')
                                ->with('message', $response->message);
            }
            else
            {
                Log::info('Failed');
                return Redirect::to('administration/splash_images')
                                ->with('message', 'There was a problem saving the accent');
            }
            



    }

   

   




}
