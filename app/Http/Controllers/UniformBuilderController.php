<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\APIClients\ColorsAPIClient;
use App\APIClients\MaterialsAPIClient;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class UniformBuilderController extends Controller
{


    public function index()
    {


        $title = 'QuickStrike Uniform Builder';

        $accessToken = null;
        $colorsClient = new ColorsAPIClient();
        $materialsClient = new MaterialsAPIClient();

        $colors = $colorsClient->getColors();
        $materials = $materialsClient->getMaterials();


        return view('editor.index', [
            'page_title' => $title,
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'colors' => $colors,
            'materials' => $materials
        ]);


    }


    public function uniform_builder_index(){


        $title = 'PROLOOK Uniform Builder';

        $accessToken = null;
        $colorsClient = new ColorsAPIClient();
        $materialsClient = new MaterialsAPIClient();

        $colors = $colorsClient->getColors();
        $materials = $materialsClient->getMaterials();


        return view('editor.uniform-builder-index', [

            'page_title' => $title,
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'colors' => $colors,
            'materials' => $materials

        ]);


    }


}
