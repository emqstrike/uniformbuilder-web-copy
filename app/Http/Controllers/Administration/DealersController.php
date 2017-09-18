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
use App\APIClients\DealersAPIClient as APIClient;



class DealersController extends Controller
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
        $dealers = $this->client->getAll();

        return view('administration.dealers.dealers', [
            'dealers' => $dealers
        ]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {   

        return view('administration.dealers.dealers-create');
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
        $subdomain_url = $request->input('subdomain_url');
        $description = $request->input('description');        
        $site_manager_user_id = $request->input('site_manager_user_id');
        $main_site_url = $request->input('main_site_url');
        
        $data = [
            'id' => $id,
            'name' => $name,
            'subdomain_url' => $subdomain_url,
            'description' => $description,            
            'site_manager_user_id' => $site_manager_user_id,
            'main_site_url' => $main_site_url
        ];        
        $folder_name = "dealers";

        // Upload logo
        try {
            $newFile = $request->file('logo');          
            if (isset($newFile)) {                
                if ($newFile->isValid()) {
                    $randstr = Random::randomize(12);
                    $data['logo'] = FileUploaderV2::upload($newFile, $randstr, 'file', $folder_name);                    
                }
            }
        } catch (S3Exception $e) {
            $message = $e->getMessage();

            return Redirect::to('/administration/dealers')->with('message', 'There was a problem uploading your files');
        }

        $response=null;
        if (!empty($id))
        {

            Log::info('Attempts to update Dealer#' . $id);
            $response = $this->client->updateDealer($data);
        }
        else
        {            
            Log::info('Attempts to create a new Dealer ' . json_encode($data));
            $response = $this->client->createDealer($data);
        }
        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('/administration/dealers')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/dealers')
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
        $dealers = $this->client->show($id);                  
        return view('administration.dealers.dealers-edit', compact('dealers'));
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
