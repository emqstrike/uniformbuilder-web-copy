<?php
namespace App\Http\Controllers\Administration;

use App\APIClients\SplashImageAPIClient as APIClient;
use App\APIClients\UniformCategoriesAPIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\SplashImageRequest;
use App\Utilities\FileUploader;
use App\Utilities\Log;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use Illuminate\Http\Request;
use \Redirect;
use \Session;


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

    public function store(SplashImageRequest $request){

          

        $splashName = $request->input('name');
        $splashCategory= $request->input('category');
        $splashShowTime = $request->input('show_time');
        $splashFrontImagePath = $request->file('front_image');
        $splashBackImagePath = $request->file('back_image');




         if (!empty($request->input('splash_image_id')))

        {

            $splashId = $request->input('splash_image_id');
        }
    
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
                    // $data['front_image'] = "image1";
                      
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
                     // $data['back_image'] = "image2";
                    
                      
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

            if (!empty($splashId))
            {


                
     
                if(empty($splashFrontImagePath)){
                    $splashFrontImagePath2 = $request->input('front_image2');
                    $data['front_image'] = $splashFrontImagePath2;
                }
                if(empty($splashBackImagePath)){
                    $splashBackImagePath2 = $request->input('back_image2');
                    $data['back_image'] = $splashBackImagePath2;
                }

                Log::info('Attempts to update splash image#' . $splashId);

                $data['id'] = $splashId;
           
                $response = $this->client->updateSplashImage($data);
               
                return Redirect::to('administration/splash_image/edit/' . $data['id'])
                                ->with('message', $response->message);
            }
            else
            {
                Log::info('Attempts to create a new splashImage ' . json_encode($data));
       
                $response = $this->client->createSplashImage($data);

            }

    
            
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
                                ->with('message', 'There was a problem saving the Splash Image');
            }
            



    }
    public function editSplashImageForm($id)
    {

        $categories = $this->uniformCategoryClient->getUniformCategories();

        $splash_image= $this->client->getSplashImage($id);


        return view('administration.splash-images.splash-image-edit', [
         'splash_image' => $splash_image,
         'categories' => $categories
        ]);

        

    }

   

   




}
