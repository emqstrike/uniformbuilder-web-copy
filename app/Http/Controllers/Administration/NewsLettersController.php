<?php
namespace Customizer\Http\Controllers\Administration;

use Illuminate\Http\Request;

use Customizer\Http\Requests;
use Customizer\Http\Controllers\Controller;


use Customizer\APIClients\NewsLettersAPIClient as APIClient;

class NewsLettersController extends Controller
{
    protected $client;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
       public function __construct(APIClient $newsLettersClient)
    {

        $this->client = $newsLettersClient;


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
