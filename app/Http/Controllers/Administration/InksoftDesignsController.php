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
use App\APIClients\InksoftDesignsAPIClient as APIClient;



class InksoftDesignsController extends Controller
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
        $inksoft_designs = $this->client->getAll();       
        return view('administration.inksoft-designs.inksoft-designs', [
            'inksoft_designs' => $inksoft_designs
        ]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {   

        return view('administration.inksoft-designs.inksoft-designs-create');
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
        $design_id = $request->input('design_id');
        $user_id = $request->input('user_id');        
        $png_filename = $request->input('png_filename');
        $svg_filename = $request->input('svg_filename');        
        $thumbnail = $request->input('thumbnail');
        $design_summary = $request->input('design_summary');
        $design_details = $request->input('design_details');
        $category = $request->input('category');
        $type = $request->input('type');
        $is_public = $request->input('is_public');
        $created_by_user_id = $request->input('created_by_user_id');
        $status = $request->input('status');
        $comments = $request->input('comments');
        $design_name = $request->input('design_name');           
        $archived = $request->input('archived');  
        $brand = $request->input('brand');  

        
        $data = [
            'id' => $id,
            'design_id' => $design_id,
            'user_id' => $user_id,
            'png_filename' => $png_filename,
            'svg_filename' => $svg_filename,            
            'thumbnail' => $thumbnail,
            'design_summary' => $design_summary,
            'design_details' => $design_details,
            'category' => $category,
            'type' => $type,
            'is_public' => $is_public, 
            'created_by_user_id' => $created_by_user_id,
            'status' => $status,
            'comments' => $comments,
            'design_name' => $design_name,
            'archived' => $archived,
            'brand' => $brand
        ];              

        $response=null;
        if (!empty($id))
        {

            Log::info('Attempts to update Inksoft Design#' . $id);
            $response = $this->client->updateDesign($data);
        }
        else
        {            
            Log::info('Attempts to create a new Inksoft Design ' . json_encode($data));
            $response = $this->client->createDesign($data);
        }
        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('/administration/inksoft_designs')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/inksoft_designs')
                            ->with('message', 'There was a problem saving.');
        }
    }

    public function searchPage()
    {
        return view('administration-lte-2.inksoft-designs.inksoft-designs-search');
    }

    public function edit($id)
    {
        $inksoft_designs = $this->client->show($id);                  
        return view('administration.inksoft-designs.inksoft-designs-edit', compact('inksoft_designs'));
    }
}
