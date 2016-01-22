<?php
namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\ColorsAPIClient;
use App\APIClients\FactoriesAPIClient;
use App\APIClients\GradientsAPIClient;
use App\APIClients\MaterialsOptionsAPIClient;
use App\APIClients\MaterialsAPIClient as APIClient;

class MaterialsController extends Controller
{
    protected $client;
    protected $optionsClient;
    protected $colorsClient;
    protected $factoriesClient;
    protected $gradientClient;

    public function __construct(
        APIClient $apiClient,
        MaterialsOptionsAPIClient $optionsClient,
        ColorsAPIClient $colorsClient,
        FactoriesAPIClient $factoriesClient,
        GradientsAPIClient $gradientClient
    )
    {
        $this->client = $apiClient;
        $this->optionsClient = $optionsClient;
        $this->factoriesClient = $factoriesClient;
        $this->colorsClient = $colorsClient;
        $this->gradientClient = $gradientClient;
    }

    /**
     * Materials
     */
    public function index()
    {
        Log::info('Index');
        $materials = $this->client->getMaterials();
        echo "test";
        dd($materials);
        foreach ($materials as &$material)
        {
            $options = $this->optionsClient->getByMaterialId($material->id);
            $material->options = $options;
        }

        $colors = $this->colorsClient->getColors();
        $gradients = $this->gradientClient->getGradients();

        return view('administration.materials.materials', [
            'materials' => $materials,
            'colors' => $colors,
            'gradients' => $gradients
        ]);
    }

    public function delete($id)
    {
        return $this->client->deleteMaterial($id);
    }

    public function editMaterialForm($id)
    {
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();

        $colorsAPIClient = new \App\APIClients\ColorsAPIClient();
        $colors = $colorsAPIClient->getColors();
        $factories = $this->factoriesClient->getFactories();

        $material = $this->client->getMaterial($id);
        return view('administration.materials.material-edit', [
            'material' => $material,
            'uniform_categories' => $uniformCategories,
            'colors' => $colors,
            'factories' => $factories
        ]);
    }

    public function addMaterialForm()
    {
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();

        $colorsAPIClient = new \App\APIClients\ColorsAPIClient();
        $colors = $colorsAPIClient->getColors();
        $factories = $this->factoriesClient->getFactories();
        return view('administration.materials.material-create', [
            'uniform_categories' => $uniformCategories,
            'colors' => $colors,
            'factories' => $factories
        ]);
    }

    public function store(Request $request)
    {
        $materialName = $request->input('name');
        $materialId = $request->input('material_id');
        $materialCode = $request->input('code');
        $factoryCode = $request->input('factory_code');
        $type = $request->input('type');
        $gender = $request->input('gender');
        $uniformCategoryId = $request->input('uniform_category_id');
        $colorCode = $request->input('color_code');
        $liningType = $request->input('lining_type');
        $slug = FileUploader::makeSlug($materialName);
        $materialId = null;
        if (!empty($request->input('material_id')))
        {
            $materialId = $request->input('material_id');
        }

        // Does the Material Name and Codes Exist?
        if ($this->client->isMaterialExist($materialName, $materialId))
        {
            return Redirect::to('/administration/materials')
                            ->with('message', 'Material Name already exists');
        }
        if ($this->client->isMaterialCodeExist($materialCode, $materialId))
        {
            return Redirect::to('/administration/materials')
                            ->with('message', 'Material Code already exists');
        }

        $data = [
            'id' => $materialId,
            'name' => $materialName,
            'slug' => $slug,
            'type' => $type,
            'code' => $materialCode,
            'gender' => $gender,
            'uniform_category_id' => $uniformCategoryId,
            'color_code' => $colorCode,
            'lining_type' => $liningType,
            'factory_code' => $factoryCode
        ];

        try {
            // Thumbnail File
            $thumbnailFile = $request->file('thumbnail_path');
            if (isset($thumbnailFile))
            {
                if ($thumbnailFile->isValid())
                {
                    $data['thumbnail_path'] = FileUploader::upload(
                                                    $thumbnailFile,
                                                    $materialName,
                                                    'thumbnail'
                                                );
                }
            }

            // Design Sheet File
            $designSheetFile = $request->file('design_sheet_path');
            if (isset($designSheetFile))
            {
                if ($designSheetFile->isValid())
                {
                    $data['design_sheet_path'] = FileUploader::upload(
                                                    $designSheetFile,
                                                    $materialName,
                                                    'design_sheet'
                                                );
                }
            }

            if (env('BUILDER_APPROACH') == '3D')
            {
                // Bump Map File
                $bumpMapFile = $request->file('bump_map_path');
                if (isset($bumpMapFile))
                {
                    if ($bumpMapFile->isValid())
                    {
                        $data['bump_map_path'] = FileUploader::upload(
                                                        $bumpMapFile,
                                                        $materialName,
                                                        'bump'
                                                    );
                    }
                }

                // Material File
                $materialFile = $request->file('material_path');
                if (isset($materialFile))
                {
                    if ($materialFile->isValid())
                    {
                        // Material
                        $data['material_path'] = FileUploader::upload(
                                                        $materialFile,
                                                        $materialName
                                                    );
                        // Generate a Thumbnail from the Base Material ONLY IF no thumbnail will be uploaded
                        if (is_null($request->file('thumbnail_path')))
                        {
                            // Thumbnail
                            $data['thumbnail_path'] = FileUploader::upload(
                                                            $materialFile,
                                                            $materialName,
                                                            'thumbnail'
                                                        );
                        }
                    }
                }

                // Shadow File
                $shadowFile = $request->file('shadow_path');
                if (isset($shadowFile))
                {
                    if ($shadowFile->isValid())
                    {
                        // Shadow
                        $data['shadow_path'] = FileUploader::upload(
                                                    $shadowFile,
                                                    $materialName,
                                                    'shadow'
                                                );
                    }
                }

                // Highlight File
                $highlightFile = $request->file('highlight_path');
                if (isset($highlightFile))
                {
                    if ($highlightFile->isValid())
                    {
                        // Highlight
                        $data['highlight_path'] = FileUploader::upload(
                                                        $highlightFile,
                                                        $materialName,
                                                        'highlight'
                                                    );
                    }
                }
            }

            if (env('BUILDER_APPROACH') == '2D')
            {
                // Front View File
                $frontViewFile = $request->file('front_view_path');
                if (isset($frontViewFile))
                {
                    if ($frontViewFile->isValid())
                    {
                        $data['front_view_path'] = FileUploader::upload(
                                                        $frontViewFile,
                                                        $materialName,
                                                        'material_perspective_view',
                                                        'perspective',
                                                        'front_view.png'
                                                    );
                    }
                }
                // Front Shape File
                $frontShapeFile = $request->file('front_view_shape');
                if (isset($frontShapeFile))
                {
                    if ($frontShapeFile->isValid())
                    {
                        $data['front_view_shape'] = FileUploader::upload(
                                                        $frontShapeFile,
                                                        $materialName,
                                                        'material_perspective_shape',
                                                        'perspective',
                                                        'front_shape.png'
                                                    );
                    }
                }
                // Back View File
                $backViewFile = $request->file('back_view_path');
                if (isset($backViewFile))
                {
                    if ($backViewFile->isValid())
                    {
                        $data['back_view_path'] = FileUploader::upload(
                                                        $backViewFile,
                                                        $materialName,
                                                        'material_perspective_view',
                                                        'perspective',
                                                        'back_view.png'
                                                    );
                    }
                }
                // Back Shape File
                $backShapeFile = $request->file('back_view_shape');
                if (isset($backShapeFile))
                {
                    if ($backShapeFile->isValid())
                    {
                        $data['back_view_shape'] = FileUploader::upload(
                                                        $backShapeFile,
                                                        $materialName,
                                                        'material_perspective_shape',
                                                        'perspective',
                                                        'back_shape.png'
                                                    );
                    }
                }
                // Right Side View File
                $rightSideViewFile = $request->file('right_side_view_path');
                if (isset($rightSideViewFile))
                {
                    if ($rightSideViewFile->isValid())
                    {
                        $data['right_side_view_path'] = FileUploader::upload(
                                                        $rightSideViewFile,
                                                        $materialName,
                                                        'material_perspective_view',
                                                        'perspective',
                                                        'right_side_view.png'
                                                    );
                    }
                }
                // Right Side Shape File
                $rightShapeFile = $request->file('right_side_view_shape');
                if (isset($rightShapeFile))
                {
                    if ($rightShapeFile->isValid())
                    {
                        $data['right_side_view_shape'] = FileUploader::upload(
                                                        $rightShapeFile,
                                                        $materialName,
                                                        'material_perspective_shape',
                                                        'perspective',
                                                        'right_side_shape.png'
                                                    );
                    }
                }
                // Left Side View File
                $leftSideViewFile = $request->file('left_side_view_path');
                if (isset($leftSideViewFile))
                {
                    if ($leftSideViewFile->isValid())
                    {
                        $data['left_side_view_path'] = FileUploader::upload(
                                                        $leftSideViewFile,
                                                        $materialName,
                                                        'material_perspective_view',
                                                        'perspective',
                                                        'left_side_view.png'
                                                    );
                    }
                }
                // Left Side Shape File
                $leftShapeFile = $request->file('left_side_view_shape');
                if (isset($leftShapeFile))
                {
                    if ($leftShapeFile->isValid())
                    {
                        $data['left_side_view_shape'] = FileUploader::upload(
                                                        $leftShapeFile,
                                                        $materialName,
                                                        'material_perspective_shape',
                                                        'perspective',
                                                        'left_side_shape.png'
                                                    );
                    }
                }
            }

        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/materials')
                            ->with('message', 'There was a problem uploading your files');
        }

        $response = null;
        if (!empty($materialId))
        {
            Log::info('Attempts to update Material#' . $materialId);
            $response = $this->client->updateMaterial($data);
        }
        else
        {
            Log::info('Attempts to create a new Material ' . json_encode($data));
            $response = $this->client->createMaterial($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('/administration/materials')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/administration/materials')
                            ->with('message', 'There was a problem saving your material');
        }

    }
}
