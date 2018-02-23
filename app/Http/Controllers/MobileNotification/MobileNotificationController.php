<?php
namespace App\Http\Controllers\MobileNotification;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;


use App\APIClients\MobileNotificationsAPIClient as APIClient;

class MobileNotificationController extends Controller
{
    protected $client;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
       public function __construct(APIClient $mobileNotificationClient)
    {

        $this->client = $mobileNotificationClient;


    }
    public function index()
    {

  
        $news_letters = $this->client->getNewsLetters();
        
        return view('administration.news-letters.news-letters', [
            'news_letters' => $news_letters
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }
  
    /** 
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {


        $name = $request->input('name');
        $email = $request->input('email');
        $contact = $request->input('contact');
        $zip = $request->input('zip');
   

        $data = [
            'name' => $name,
            'email' => $email,
            'contact' => $contact,
            'zip' => $zip,
            'catyegory' => 'Mobile Launching'
        ];
        
        $response = $this->client->createMobileNotification($data);


        return redirect()->away('https://www.prolook.com/');
      
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
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $requeast, $id)
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
