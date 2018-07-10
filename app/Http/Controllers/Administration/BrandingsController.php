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

        return view('administration.brandings.brandings-create');
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
        $site_code = $request->input('site_code');
        $template_folder = $request->input('template_folder');

        $data = [
            'site_name' => $site_name,
            'site_code' => $site_code,
            'template_folder' => $template_folder
        ];

        $response=null;
        if (!empty($id))
        {
            $data['id'] = $id;
            Log::info('Attempts to update Brand#' . $id);
            $response = $this->client->updateBrand($data);
        }
        else
        {
            Log::info('Attempts to create a new Brand ' . json_encode($data));
            $response = $this->client->createBrand($data);
        }
        if ($response->success)
        {
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
