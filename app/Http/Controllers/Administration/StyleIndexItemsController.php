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
use App\APIClients\BlockPatternsAPIClient;
use App\APIClients\UniformCategoriesAPIClient;
use App\APIClients\StylesIndexesAPIClient;
use App\APIClients\StyleIndexItemsAPIClient as APIClient;

class StyleIndexItemsController extends Controller
{
    protected $client;
    protected $blockPatternClient;
    protected $uniformCategoriesClient;
    protected $stylesIndexesClient;

    public function __construct(
        APIClient $apiClient,
        BlockPatternsAPIClient $blockPatternsAPIClient,
        UniformCategoriesAPIClient $uniformCategoriesClient,
        StylesIndexesAPIClient  $stylesIndexesClient
    )
    {
        $this->client = $apiClient;
        $this->blockPatternClient = $blockPatternsAPIClient;
        $this->uniformCategoriesClient = $uniformCategoriesClient;    
        $this->stylesIndexesClient = $stylesIndexesClient;    
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      
    }

    public function getByStyleID($id)
    {
        $style_index_items = $this->client->getByStyleID($id);
        $style_indexes = $this->stylesIndexesClient->show($id);         
        return view('administration.styles-index.styles-index-items', [
            'style_index_items' => $style_index_items,
            'style_index_id' => $id,
            'style_indexes' => $style_indexes
        ]);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($style_index_id)
    {   
        $sports = $this->uniformCategoriesClient->getUniformCategories();
        $block_patterns = $this->blockPatternClient->getBlockPatterns();      
        return view('administration.styles-index.styles-index-items-create', [
            'block_patterns' => $block_patterns,
            'sports' => $sports,
            'style_index_id' => $style_index_id            
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
        $style_index_id = $request->input('style_index_id');
        $name = $request->input('name');       
        $alias = $request->input('alias');
        $uniform_category = $request->input('uniform_category_id');        
        if( $request->input('block_pattern_value') ){
            $block_pattern = explode(",", $request->input('block_pattern_value'));
        } else {
            $block_pattern = "";
        }
        if( $request->input('neck_option_value') ){
            $neck_option = explode(",", $request->input('neck_option_value'));
        } else {
            $neck_option = "";
        }

        $description = $request->input('description');
        $gender = $request->input('gender');

        $data = [
            'id' => $id,
            'style_index_id' => $style_index_id,
            'name' => $name,
            'alias' => $alias,
            'uniform_category' => $uniform_category,
            'block_pattern' => $block_pattern,
            'neck_option' => $neck_option,
            'description' => $description,            
            'gender' => $gender           
        ];        

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
            $message = $e-> getMessage();
            return Redirect::to('/administration/styles_index/items/'.$style_index_id)->with('message', 'There was a problem uploading your files');
        } 
   
        $response=null;
        if (!empty($id))
        {
            Log::info('Attempts to update Styles Index#' . $id);
            $response = $this->client->updateStyleIndexItem($data);
        }
        else
        {            
            Log::info('Attempts to create a new Styles Index ' . json_encode($data));
            $response = $this->client->createStyleIndexItem($data);
        }
        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('/administration/styles_index/items/'.$style_index_id)
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/styles_index/items/' .$style_index_id)
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
    public function edit($style_index_id, $id)
    {
        $style_index_id = $style_index_id;
        $style_index_item = $this->client->show($id); 
        $sports = $this->uniformCategoriesClient->getUniformCategories();
        $block_patterns = $this->blockPatternClient->getBlockPatterns();   

        return view('administration.styles-index.styles-index-item-edit', compact('style_index_item', 'style_index_id', 'sports', 'block_patterns'));
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
