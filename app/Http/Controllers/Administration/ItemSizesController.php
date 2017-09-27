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
use App\APIClients\UniformCategoriesAPIClient;
use App\APIClients\ItemSizesAPIClient as APIClient;



class ItemSizesController extends Controller
{
    protected $client;
    protected $uniformCategoriesClient;

    public function __construct(
        APIClient $apiClient,
        UniformCategoriesAPIClient $uniformCategoriesClient  
    )
    {
        $this->client = $apiClient;
        $this->uniformCategoriesClient = $uniformCategoriesClient;    
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $item_sizes = $this->client->getAll();

        return view('administration.item-sizes.item-sizes', [
            'item_sizes' => $item_sizes
        ]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {   
        $sports = $this->uniformCategoriesClient->getUniformCategories();
        return view('administration.item-sizes.item-sizes-create' , [
            'sports' => $sports
        ]);
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
        $sport = $request->input('sport');
        $description = $request->input('description');
        $properties = $request->input('item_size_props');        
               
        $data = [
            'id' => $id,
            'sport' => $sport,            
            'description' => $description,            
            'properties' => $properties            
        ];       
        
        $response=null;
        if (!empty($id))
        {
            Log::info('Attempts to update Item Size#' . $id);
            $response = $this->client->updateItemSize($data);
        }
        else
        {            
            Log::info('Attempts to create a new Item Size ' . json_encode($data));
            
            $response = $this->client->createItemSize($data);
        }
        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('/administration/item_sizes')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/item_sizes')
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
        $item_sizes = $this->client->show($id);
        $sports = $this->uniformCategoriesClient->getUniformCategories();                  
        return view('administration.item-sizes.item-sizes-edit', compact('item_sizes' ,'sports'));
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
