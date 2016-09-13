<?php

namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use Aws\S3\Exception\S3Exception;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;
use App\APIClients\UniformDesignSetsAPIClient as APIClient;
use App\APIClients\ColorsAPIClient;
use App\APIClients\UniformCategoriesAPIClient;
use App\APIClients\MaterialsAPIClient;
use App\APIClients\FabricsAPIClient;
use App\APIClients\LiningsAPIClient;

class UniformDesignSetsController extends Controller
{
    protected $client;
    protected $colorsClient;
    protected $categoriesClient;
    protected $materialsClient;
    protected $fabricsClient;
    protected $liningsClient;

    public function __construct(
        APIClient $apiClient,
        ColorsAPIClient $colorsClient,
        UniformCategoriesAPIClient $categoriesClient,
        MaterialsAPIClient $materialsClient,
        FabricsAPIClient $fabricsClient,
        LiningsAPIClient $liningsClient
    )
    {
        $this->client = $apiClient;
        $this->colorsClient = $colorsClient;
        $this->categoriesClient = $categoriesClient;
        $this->materialsClient = $materialsClient;
        $this->fabricsClient = $fabricsClient;
        $this->liningsClient = $liningsClient;
    }

    public function index()
    {
        $designs = $this->client->getDesignSets();

        return view('administration.designs.designs', [
            'designs' => $designs
        ]);
    }

    public function editForm($id)
    {
        $design = $this->client->getDesignSet($id);
        $uniformCategories = $this->categoriesClient->getUniformCategories();
        $colors = $this->colorsClient->getColors();
        $upperUniforms = $this->materialsClient->getUpperBodyUniforms();
        $lowerUniforms = $this->materialsClient->getLowerBodyUniforms();
        $fabrics = $this->fabricsClient->getFabrics();
        $linings = $this->liningsClient->getLinings();

        return view('administration.designs.design-edit', [
            'design' => $design,
            'uniform_categories' => $uniformCategories,
            'colors' => $colors,
            'upper_uniforms' => $upperUniforms,
            'lower_uniforms' => $lowerUniforms,
            'fabrics' => $fabrics,
            'linings' => $linings
        ]);
    }

    public function addForm()
    {
        $uniformCategories = $this->categoriesClient->getUniformCategories();
        $colors = $this->colorsClient->getColors();
        $upperUniforms = $this->materialsClient->getUpperBodyUniforms();
        $lowerUniforms = $this->materialsClient->getLowerBodyUniforms();
        $fabrics = $this->fabricsClient->getFabrics();
        $linings = $this->liningsClient->getLinings();
        return view('administration.designs.design-create', [
            'uniform_categories' => $uniformCategories,
            'colors' => $colors,
            'upper_uniforms' => $upperUniforms,
            'lower_uniforms' => $lowerUniforms,
            'fabrics' => $fabrics,
            'linings' => $linings
        ]);
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        $code = $request->input('code');
        $gender = $request->input('gender');
        $uniform_category_id = $request->input('uniform_category_id');
        $upper_body_uniform = $request->input('upper_body_uniform');
        $lower_body_uniform = $request->input('lower_body_uniform');
        $base_color_code = $request->input('base_color_code');
        $base_fabric_code = $request->input('base_fabric_code');
        $lining_code = $request->input('lining_code');

        $data = [
            'name' => $name,
            'code' => $code,
            'gender' => $gender,
            'uniform_category_id' => $uniform_category_id,
            'upper_body_uniform' => $upper_body_uniform,
            'lower_body_uniform' => $lower_body_uniform,
        ];

        $designId = null;
        if (!empty($request->input('uniform_design_set_id')))
        {
            $designId = $request->input('uniform_design_set_id');
            $data['id'] = $designId;
        }

        // try {
        //     // Thumbnail File
        //     $thumbnailFile = $request->file('thumbnail_path');
        //     if (isset($thumbnailFile))
        //     {
        //         if ($thumbnailFile->isValid())
        //         {
        //             $data['thumbnail_path'] = FileUploader::upload(
        //                                             $thumbnailFile,
        //                                             $name,
        //                                             'thumbnail',
        //                                             'design_sets',
        //                                             "{$code}-thumbnail.png"
        //                                         );
        //         }
        //     }
        // }
        // catch (S3Exception $e)
        // {
        //     $message = $e->getMessage();
        //     return Redirect::to('/administration/design_sets')
        //                     ->with('message', 'There was a problem uploading your files');
        // }

        $id = null;
        if (!empty($request->input('uniform_design_id')))
        {
            $id = $request->input('uniform_design_id');
            $data['id'] = $id;
        }

        // Is the Design Name taken?
        if ($this->client->isDesignTaken($code, $id))
        {
            return Redirect::to('administration/design_sets')
                            ->with('message', 'Code already exist');
        }

        if ($request->input('type'))
        {
            $data['type'] = $request->input('type');
        }

        $response = null;
        if (!empty($designId))
        {
            Log::info('Attempts to update Uniform Design#' . $id);
            $response = $this->client->updateDesign($data);
        }
        else
        {
            Log::info('Attempts to create a new Uniform Design ' . json_encode($data));
            $response = $this->client->createDesign($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/design_sets')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/design_sets')
                            ->with('message', $response->message);
        }
    }

}