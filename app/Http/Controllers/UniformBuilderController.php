<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\APIClients\ColorsAPIClient;
use App\APIClients\MaterialsAPIClient;
use App\APIClients\UniformDesignSetsAPIClient;
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

    public function uniform_builder_set($design_set_id = null){

        $accessToken = null;
        $colors = $this->colorsClient->getColors();
        $material = $this->materialsClient->getMaterial(1);


        $material_id = -1;

        if ($design_set_id == null)  {
            
            if ( count($this->materialsClient->getMaterials()) > 0 ) {

                $material_id = $this->materialsClient->getMaterials()[0]->id;

            }
            else {

                $material_id = -1;

            }

        }
        else {

            $uniformDesignSetsAPIClient = new UniformDesignSetsAPIClient();
            $design_set = $uniformDesignSetsAPIClient->getDesignSet($design_set_id);

            $upper = $this->materialsClient->getMaterialByCode($design_set->upper_body_uniform);
            $material_id = $upper->id;

        }
        
        return view('editor.uniform-builder-index', [
            'page_title' => env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'colors' => $colors,
            'material' => $material,
            'material_id' => $material_id,
            
        ]);


    }

    public function uniform_builder_single($material_id = null){

        $accessToken = null;

        $colors = $this->colorsClient->getColors();
        $material = $this->materialsClient->getMaterial($material_id);

        if (is_object($material))
        {
            $categoryId = $material->uniform_category_id;
        }
        
        return view('editor.uniform-builder-index', [
            'app_title' => env('APP_TITLE'),
            'page_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'colors' => $colors,
            'material' => $material,
            'material_id' => $material_id,
            'category_id' => $categoryId
        ]);
    }
}
