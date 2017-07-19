<?php

namespace App\Http\Controllers\Administration;

use Illuminate\Http\Request;

use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use App\Http\Controllers\Controller;
use App\APIClients\SalesRepresentativesAPIClient as APIClient;

class SalesRepresentativesController extends Controller
{
    
    protected $client;


    public function __construct(
        APIClient $apiClient
    )

    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $sales_reps = $this->client->getSalesReps();
        return view('administration.sales-reps.sales-reps', compact ('sales_reps'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $dealers = ['Prolook', 'Valley Athletics'];
        return view('administration.sales-reps.create-sales-reps', compact ('dealers'));        
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
        $firstname = $request->input('first_name');
        $lastname = $request->input('last_name');
        $repid = $request->input('rep_id');
        $email = $request->input('user_id');
        $userid = $request->input('user_id');
        $zip = $request->input('zip_codes');
        $manager = $request->input('is_manager');
        $dealer = $request->input('dealer');
        $active = $request->input('active');

        $data = [
            'id' => $id,
            'first_name' => $firstname,
            'last_name' => $lastname,
            'rep_id' => $repid,
            'user_id' => $email,
            'email' => $userid,
            'zip_codes' => $zip,
            'is_manager' => $manager,
            'dealer' => $dealer,
            'active' => $active
        ];

        if (!empty($id))
        {
            Log::info('Attempts to update Sales Representative #' . $id);
            $response = $this->client->updateSalesRep($data);
        }
        else
        {
            Log::info('Attempts to create a new Sales Representative ' . json_encode($data));
            $response = $this->client->createSalesRep($data); 
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('/administration/sales_reps')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/sales_reps')
                            ->with('message', 'There was a problem adding.');
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
        $rep = $this->client->show($id);
        $dealers = ['Prolook', 'Valley Athletics'];

        return view('administration.sales-reps.edit-sales-reps' , compact('rep' , 'dealers'));
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
