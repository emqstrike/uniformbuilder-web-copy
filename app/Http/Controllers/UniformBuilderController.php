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
        $asset = [
            'version' => '?v=0.004',
            'storage' => ''
        ];

        $accessToken = null;
        $colorsClient = new ColorsAPIClient();
        $materialsClient = new MaterialsAPIClient();


        $colors = $colorsClient->getColors();
        $materials = $materialsClient->getMaterials();

        return view('editor.index', [
            'page_title' => $title,
            'asset_version' => $asset['version'],
            'asset_storage' => $asset['storage'],
            'colors' => $colors,
            'materials' => $materials
        ]);

    }

}
