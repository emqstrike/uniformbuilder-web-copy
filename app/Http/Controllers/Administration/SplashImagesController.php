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

use App\APIClients\UniformCategoriesAPIClient;


class SplashImagesController extends Controller
{
    protected $client;

    protected $uniformCategoryClient;

    public function __construct(APIClient $apiClient, UniformCategoriesAPIClient $uniformCategoryAPIClient) 
    {

        $this->client = $apiClient;

        $this->uniformCategoryClient = $uniformCategoryAPIClient;

    }
    public function index()
    {
        $splash_images = $this->client->getAllSplashImages();
     
        
       
        return view('administration.splash-images.splash-images', [
            'splash_images' => $splash_images
           
        ]);

    }
        
    public function create()
    {
        $categories = $this->uniformCategoryClient->getUniformCategories();
   
       
         return view('administration.splash-images.splash-image-create', [
             'categories' => $categories
        ]);

    }

    public function store(Request $request){

          
    
        $splashName = $request->input('name');
        $splashCategory= $request->input('category');
        $splashShowTime = $request->input('show_time');
        $splashFrontImagePath = $request->file('front_image');
        $splashBackImagePath = $request->file('back_image');

    
        $data = [
        'name' => $splashName,
        'category' => $splashCategory,
        'show_time' => $splashShowTime,
        'front_image' => $splashFrontImagePath,
        'back_image' => $splashBackImagePath
     

        ];

       
        try {
    // $accentName="splashImage";
     
        
         
            if (isset($splashFrontImagePath))
            {                
                if ($splashFrontImagePath->isValid())
                {
                    $filename = Random::randomize(12);
                   
                    $data['front_image'] = FileUploader::upload(
                                                    $splashFrontImagePath,
                                                    "splash_front",
                                                    "material_option",
                                                    "materials",
                                                    "{$filename}.png"
                                                );
                    $data['front_image'] = "image1";
                      
                }
            }
            if (isset($splashBackImagePath))
            {    
                if ($splashBackImagePath->isValid())
                {
                    $filename = Random::randomize(12);
                   
                    $data['back_image'] = FileUploader::upload(
                                                    $splashBackImagePath,
                                                    "splash_back",
                                                    'material_option',
                                                    "materials",
                                                    "{$filename}.png"
                                                );
                    $data['back_image'] = "image2";
                    
                      
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
