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
use App\APIClients\StylesIndexesAPIClient as APIClient;

class StylesIndexesController extends Controller
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
        $styles_indexes = $this->client->getAll();

        return view('administration.styles-index.styles-index', [
            'styles_indexes' => $styles_indexes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {   

        return view('administration.styles-index.styles-index-create');
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
        $name = $request->input('name');       
        $alias = $request->input('alias');
        $description = $request->input('description');
        $gender = $request->input('gender');

        $data = [
            'id' => $id,
            'name' => $name,
            'alias' => $alias,
            'description' => $description,            
            'gender' => $gender           
        ];        
        // dd($data);
        $folder_name = "styles_indexes";

        // Upload Thumbnail
        try {
            $newFile = $request->file('thumbnail');          
            if (isset($newFile)) {                
                if ($newFile->isValid()) {
                    $randstr = Random::randomize(12);
                    $data['thumbnail'] = FileUploaderV2::upload($newFile, $randstr, 'file', $folder_name);                    
                }
            }
        } catch (S3Exception $e) {
            $message = $e->getMessage();
            return Redirect::to('/administration/styles_indexes')->with('message', 'There was a problem uploading your files');
        } 
   
        $response=null;
        if (!empty($id))
        {
            Log::info('Attempts to update Styles Index#' . $id);
            $response = $this->client->updateStyleIndex($data);
        }
        else
        {            
            Log::info('Attempts to create a new Styles Index ' . json_encode($data));
            $response = $this->client->createStyleIndex($data);
        }
        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('/administration/styles_indexes')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/styles_indexes')
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
        $styles_indexes = $this->client->show($id);                  
        return view('administration.styles-index.styles-index-edit', compact('styles_indexes'));
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
