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

        $dealers = ["Bentleys Pro Look","Brents Uniform Factory","Kai Athletic","Dan Mullins","Team Works","Devri Fitzgerald","Dusty Rhodes","jared","Big Mountain Sales","Jaxon Karren","Hillock Team Sports","Joshua Swick Azure","2988 Athletic Apparel","Level 42 Sports","Armorzone","Nicole Carlin","PLS Level 1","PLS Level 2","PLS Level 3","PLS Level 4XXX","Pro Look Admin","Sakovitz Sports","First String","Big Game Sports Apparel","Jeremy Hill","Jordan Hillock","Corporate","Cat Sports & Marketing","Valley Athletics","Hauff Mid-America Sports","Steve Angeline Sales","Kyler Johnson","Mickey St. Pierre","TJ Schenbeck","qStrike DevTeam","Larry Green","QStrike Geeks","BJ Chandler","Tyler Higbee","Kory Drew","Jeff Gagon","Test Uniform Company","Burgandy Fisher","Beau Hamilton","Shige Yamamoto","Dave Dahlke","Ralph Parks","Rodney Putnam","Richard Vossen","Penisimani Latu","Dustin Poulsen","Kawika Akina","Jonathan Castro","Tom Barrera","Parker Overly","Jerry","Riki Sanford","Russell Christensen","Jeremy Schlosser","Yves Dossous","Robbie Rathburn","David Van Gend","Myla Rhodes","Heather McCormack","Raymond Khalif","Kaitlyn Kidman","Kyle Jameson"];

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
        $corporate = $request->input('is_corporate');
        $dealerid = $request->input('dealer_id');
        $repidmanager = $request->input('rep_id_manager');
        $alias = $request->input('alias');

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
            'active' => $active,
            'is_corporate' => $corporate,
            'dealer_id' => $dealerid,
            'rep_id_manager' => $repidmanager,
            'alias' => $alias
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
        $dealers = ["Bentleys Pro Look","Brents Uniform Factory","Kai Athletic","Dan Mullins","Team Works","Devri Fitzgerald","Dusty Rhodes","jared","Big Mountain Sales","Jaxon Karren","Hillock Team Sports","Joshua Swick Azure","2988 Athletic Apparel","Level 42 Sports","Armorzone","Nicole Carlin","PLS Level 1","PLS Level 2","PLS Level 3","PLS Level 4XXX","Pro Look Admin","Sakovitz Sports","First String","Big Game Sports Apparel","Jeremy Hill","Jordan Hillock","Corporate","Cat Sports & Marketing","Valley Athletics","Hauff Mid-America Sports","Steve Angeline Sales","Kyler Johnson","Mickey St. Pierre","TJ Schenbeck","qStrike DevTeam","Larry Green","QStrike Geeks","BJ Chandler","Tyler Higbee","Kory Drew","Jeff Gagon","Test Uniform Company","Burgandy Fisher","Beau Hamilton","Shige Yamamoto","Dave Dahlke","Ralph Parks","Rodney Putnam","Richard Vossen","Penisimani Latu","Dustin Poulsen","Kawika Akina","Jonathan Castro","Tom Barrera","Parker Overly","Jerry","Riki Sanford","Russell Christensen","Jeremy Schlosser","Yves Dossous","Robbie Rathburn","David Van Gend","Myla Rhodes","Heather McCormack","Raymond Khalif","Kaitlyn Kidman","Kyle Jameson"];

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
