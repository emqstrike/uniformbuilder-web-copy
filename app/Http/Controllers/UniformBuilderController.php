<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\APIClients\ColorsAPIClient;
use App\APIClients\MaterialsAPIClient;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class UniformBuilderController extends Controller
{
    protected $materialsClient;
    protected $colorsClient;

    public function __construct(
        MaterialsAPIClient $materialsClient,
        ColorsAPIClient $colorsClient
    )
    {
        $this->materialsClient = $materialsClient;
        $this->colorsClient = $colorsClient;
    }

    public function index()
    {
        $accessToken = null;
        $colors = $this->colorsClient->getColors();
        $material = $this->materialsClient->getMaterial(1);

        $materialId = -1;
        if (count($this->materialsClient->getMaterials()) > 0)
        {
            $materialId = $this->materialsClient->getMaterials()[0]->id;
            $categoryId = $material->uniform_category_id;
        }

        return view('editor.uniform-builder-index', [
            'page_title' => env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'colors' => $colors,
            'material' => $material, 
            'material_id' => $materialId,
            'category_id' => $categoryId
        ]);
    }
}
