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
use App\APIClients\CutsLinksAPIClient as APIClient;



class CutsLinksController extends Controller
{
    protected $client;
    protected $blockPatternClient;
    protected $uniformCategoriesClient;

    public function __construct(
        APIClient $apiClient,
        BlockPatternsAPIClient $blockPatternsAPIClient,
        UniformCategoriesAPIClient $uniformCategoriesClient

    )
    {
        $this->client = $apiClient;
        $this->blockPatternClient = $blockPatternsAPIClient;
        $this->uniformCategoriesClient = $uniformCategoriesClient;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cuts_links = $this->client->getAll();

        return view('administration.cuts-links.cuts-links', [
            'cuts_links' => $cuts_links
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
        $block_patterns = $this->blockPatternClient->getBlockPatterns();
        return view('administration.cuts-links.cuts-links-create',[
            'block_patterns' => $block_patterns,
            'sports' => $sports,
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
        $block = $request->input('block_pattern_id');
        $neck = $request->input('neck_option');

        $data = [
            'id' => $id,
            'sport' => $sport,
            'block_pattern_id' => $block,
            'neck_option' => $neck
        ];

        $folder_name = "cuts_links";

        // Upload PDF file
        try {
            $newFile = $request->file('cuts_pdf');
            if (isset($newFile)) {
                if ($newFile->isValid()) {
                    $randstr = Random::randomize(12);
                    $data['cuts_pdf'] = FileUploaderV2::upload($newFile, $randstr, 'file', $folder_name);
                }
            }
        } catch (S3Exception $e) {
            $message = $e->getMessage();

            return Redirect::to('/administration/cuts_links')->with('message', 'There was a problem uploading your files');
        }

        $response=null;
        if (!empty($id))
        {
            Log::info('Attempts to update Cuts Link#' . $id);
            $response = $this->client->updateCutsLinks($data);
        }
        else
        {
            Log::info('Attempts to create a new Cuts Link ' . json_encode($data));
            $response = $this->client->createCutsLinks($data);
        }
        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('/administration/cuts_links')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/cuts_links')
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
        $cut_links = $this->client->show($id);
        $sports = $this->uniformCategoriesClient->getUniformCategories();
        $block_patterns = $this->blockPatternClient->getBlockPatterns();


        return view('administration.cuts-links.cuts-links-edit', compact('cut_links' , 'sports',  'block_patterns'));
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
