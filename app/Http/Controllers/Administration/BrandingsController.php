<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use \Session;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Utilities\Log;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use App\Utilities\FileUploader;
use App\Utilities\FileUploaderV2;
use App\Http\Controllers\Controller;
use Brotzka\DotenvEditor\DotenvEditor;
use Config;
use App\APIClients\BrandingsAPIClient as APIClient;



class BrandingsController extends Controller
{
    protected $client; 

    public function __construct(
        APIClient $apiClient               
    )
    {
        $this->client = $apiClient;       
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $brandings = $this->client->getAll();    
            return view('administration.brandings.brandings', [
            'brandings' => $brandings            
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {   
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $id = $request->input('id');
        $site_name = $request->input('site_name');
        $primary_forecolor = $request->input('primary_forecolor');
        $secondary_forecolor = $request->input('secondary_forecolor');
        $primary_background_color = $request->input('primary_background_color');
        $secondary_background_color = $request->input('secondary_background_color');

        if (strpos($primary_forecolor, '#') > -1)
        {
            $primary_forecolor = str_replace('#', '', $primary_forecolor);
        }
        if (strpos($secondary_forecolor, '#') > -1)
        {
            $secondary_forecolor = str_replace('#', '', $secondary_forecolor);
        }
        if (strpos($primary_background_color, '#') > -1)
        {
            $primary_background_color = str_replace('#', '', $primary_background_color);
        }
        if (strpos($secondary_background_color, '#') > -1)
        {
            $secondary_background_color = str_replace('#', '', $secondary_background_color);
        }
        
        $data = [
            'id' => $id,            
            'site_name' => $site_name,
            'primary_forecolor' => $primary_forecolor,
            'secondary_forecolor' => $secondary_forecolor,
            'primary_background_color' => $primary_background_color,
            'secondary_background_color' => $secondary_background_color
        ];        
        $folder_name = "brandings";
        
        try {
            $newFile = $request->file('site_logo');          
            if (isset($newFile)) {                
                if ($newFile->isValid()) {
                    $randstr = Random::randomize(12);
                    $data['site_logo'] = FileUploaderV2::upload($newFile, $randstr, 'file', $folder_name);
                    $site_logo = $data['site_logo'];
                }
            } else 
            {
            $site_logo = $request->input('site_logo_text');
        }
        } catch (S3Exception $e) {
            $message = $e->getMessage();

            return Redirect::to('/administration/brandings')->with('message', 'There was a problem uploading your files');
        }

        $response=null;
        if (!empty($id))
        {   
           Log::info('Attempts to update Branding#' . $id);

            $response = $this->client->updateBrandings($data);
        }
      
        if ($response->success)
        {
            $env = new DotenvEditor();
            $env->changeEnv([
                'SITE_NAME' => $site_name,
                'SITE_LOGO' => $site_logo, 
                'PRIMARY_FORECOLOR' => $primary_forecolor,
                'SECONDARY_FORECOLOR'   => $secondary_forecolor,              
                'PRIMARY_BACKGROUND_COLOR'  => $primary_background_color,
                'SECONDARY_BACKGROUND_COLOR'    => $secondary_background_color
            ]);           
            Log::info('Success');
            return Redirect::to('/administration/brandings')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/brandings')
                            ->with('message', 'There was a problem saving.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $brandings = $this->client->show($id);            

        return view('administration.brandings.brandings-edit', compact('brandings'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
