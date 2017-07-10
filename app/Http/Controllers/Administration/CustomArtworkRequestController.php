<?php

namespace App\Http\Controllers\Administration;

use App\APIClients\ColorsAPIClient;
use App\APIClients\CustomArtworkRequestAPIClient;
use App\APIClients\MascotsCategoriesAPIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CustomArtworkRequestController extends Controller
{
    private $client;

    public function __construct(CustomArtworkRequestAPIClient $client)
    {
        $this->client = $client;
    }

    public function index()
    {
        $customArtworkRequests = $this->client->index();
        $user_id               = Session::get('userId');

        return view('administration.artworks.custom-artwork-requests', compact('customArtworkRequests', 'user_id'));
    }

    public function getProcessing()
    {
        $customArtworkRequests = $this->client->getProcessing();
        $account_type          = Session::get('accountType');
        $user_id               = Session::get('userId');

        return view('administration.artworks.processing-custom-artwork-requests', compact('customArtworkRequests', 'account_type'));
    }

    public function upload($id)
    {
        $customArtworkRequest = $this->client->getByID($id);
        $_mascotColors = json_decode($customArtworkRequest->colors, true);

        $mascotColors = [];

        if ($_mascotColors) {
            foreach ($_mascotColors as $mascotColor) {
                if ($mascotColor) {
                    $mascotColors[] = (new ColorsAPIClient())->getColorByCode($mascotColor);
                }
            }
        }

        $mascotCategories     = array();
        $rawMascotsCategories = (new MascotsCategoriesAPIClient())->getMascotCategories();

        foreach ($rawMascotsCategories as $mascotCategory) {
            if ($mascotCategory->active == 1) {
                $mascotCategories[] = $mascotCategory->name;
            }
        }

        $mascotCategories = array_sort($mascotCategories, function($value) {
            return sprintf('%s,%s', $value[0], $value[1]);
        });

        $colors = (new ColorsAPIClient())->getColors();

        // this should be 0 as there will only be one custom artwork uploaded
        // during team store registration
        $customArtworkIndex = 0;

        return view('administration.mascots.upload-custom-artwork', compact(
            'customArtworkRequest', 
            'mascotColors', 
            'mascotCategories', 
            'colors',
            'customArtworkIndex'
        ));
    }
}
