<?php
namespace Customizer\Http\Controllers\Administration;

use \Session;
use \Redirect;
use Customizer\Http\Requests;
use Customizer\Utilities\Log;
use Illuminate\Http\Request;
use Customizer\Http\Controllers\Controller;
use Customizer\APIClients\MockupSetsAPIClient as APIClient;

class MockupSetsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    /**
     * MockupSets
     */
    public function index()
    {

    
        $mockup_sets = $this->client->getMockupSets();
      
        return view('administration.mockup-sets.mockup-sets', [
            'mockup_sets' => $mockup_sets
        ]);
    }


      public function show($id)
    {
        $mockup_set = $this->client->getMockupSet($id);
             // dd( $mockup_set);     
        return view('administration.mockup-sets.mockup-set-view', [
        'mockup_set' => $mockup_set,
        ]);

        

    }


}
