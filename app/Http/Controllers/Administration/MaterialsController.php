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
use App\APIClients\ApplicationsAPIClient;
use App\APIClients\BoundariesAPIClient;
use App\APIClients\FontsAPIClient;
use App\APIClients\BlockPatternsAPIClient;
use App\APIClients\MaterialsOptionsAPIClient;
use App\APIClients\MaterialsAPIClient as APIClient;

class MaterialsController extends Controller
{
    protected $client;
    protected $optionsClient;
    protected $colorsClient;
    protected $factoriesClient;
    protected $gradientClient;
    protected $applicationClient;
    protected $boundaryClient;
    protected $fontClient;
    protected $blockPatternClient;

    public function __construct(
        APIClient $apiClient,
        MaterialsOptionsAPIClient $optionsClient,
        ColorsAPIClient $colorsAPIClient,
        FactoriesAPIClient $factoriesAPIClient,
        GradientsAPIClient $gradientsAPIClient,
        ApplicationsAPIClient $applicationsAPIClient,
        BoundariesAPIClient $boundariesAPIClient,
        FontsAPIClient $fontsAPIClient,
        BlockPatternsAPIClient $blockPatternsAPIClient
    )
    {
        $this->client = $apiClient;
        $this->optionsClient = $optionsClient;
        $this->factoriesClient = $factoriesAPIClient;
        $this->colorsClient = $colorsAPIClient;
        $this->gradientClient = $gradientsAPIClient;
        $this->applicationClient = $applicationsAPIClient;
        $this->boundaryClient = $boundariesAPIClient;
        $this->fontClient = $fontsAPIClient;
        $this->blockPatternClient = $blockPatternsAPIClient;
    }

    /**
     * Materials
     */
    public function index()
    {
        Log::info('Index');
        $materials = $this->client->getMaterials();
        $block_patterns = $this->blockPatternClient->getBlockPatterns();

        return view('administration.materials.materials', [
            'block_patterns' => $block_patterns,
            'materials' => $materials
        ]);
    }

    public function getMaterialOptions($id)
    {
        Log::info('Get Material Options');

        $options = $this->optionsClient->getByMaterialId($id);
        $colors = $this->colorsClient->getColors();
        $applications = $this->applicationClient->getApplications();
        $boundaries = $this->boundaryClient->getBoundaries();
        $fonts = $this->fontClient->getFonts();

        foreach($options as $option){
            $default_color = $option->default_color;
            $sublimated_default_color = $option->sublimated_default_color;

            foreach($colors as $color){
                if($color->color_code == $default_color) {
                    $option->default_hex_code = $color->hex_code;
                    $option->default_color_name = $color->name;
                    break;
                } else {
                    $option->default_hex_code = "000";
                    $option->default_color_name = "Black";
                }
            }
            foreach($colors as $color){
                if($color->color_code == $sublimated_default_color) {
                    $option->sublimated_default_hex_code = $color->hex_code;
                    $option->sublimated_default_color_name = $color->name;
                    break;
                } else {
                    $option->sublimated_default_hex_code = "000";
                    $option->sublimated_default_color_name = "Black";
                }
            }
        }

        $material = $this->client->getMaterial($id);

        $gradients = $this->gradientClient->getGradients();

        return view('administration.materials.material-options', [
            'material' => $material,
            'options' => $options,
            'colors' => $colors,
            'gradients' => $gradients,
            'applications' => $applications,
            'boundaries' => $boundaries,
            'fonts' => $fonts
        ]);
    }

    public function materialsOptionsSetup($id)
    {
        Log::info('Materials Options QS');

        $material = $this->client->getMaterialQS($id);
        $options = $this->optionsClient->getByMaterialId($id);

        return view('administration.materials.material-options-setup', [
            'material' => $material,
            'options' => $options,
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
        $block_patterns = $this->blockPatternClient->getBlockPatterns();

        $material = $this->client->getMaterial($id);
        return view('administration.materials.material-edit', [
            'material' => $material,
            'uniform_categories' => $uniformCategories,
            'colors' => $colors,
            'factories' => $factories,
            'block_patterns' => $block_patterns
        ]);
    }

    public function addMaterialForm()
    {
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();
        $block_patterns = $this->blockPatternClient->getBlockPatterns();

        $factories = $this->factoriesClient->getFactories();
        return view('administration.materials.material-create', [
            'uniform_categories' => $uniformCategories,
            'factories' => $factories,
            'block_patterns' => $block_patterns
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
        $uniformApplicationType = $request->input('uniform_application_type');
        $sizes = $request->input('sizes');
        $debugMode = $request->input('debug_mode');
        $slug = FileUploader::makeSlug($materialName);

        $block_pattern_id = $request->input('block_pattern_id');

        if (!empty($request->input('neck_option')))
        {
            $neck_option = $request->input('neck_option');
        }

        $neck_option = $request->input('neck_option');
        $price_item_code = $request->input('price_item_code');
        $item_id = $request->input('item_id');
        $sku = $request->input('sku');
        $builder_customizations = $request->input('builder_customizations');

        $description = $request->input('description');

        $design_type = $request->input('design_type');

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
            'factory_code' => $factoryCode,
            'block_pattern_id' => $block_pattern_id,
            'neck_option' => $neck_option,
            'price_item_code' => $price_item_code,
            'item_id' => $item_id,
            'sku' => $sku,
            'builder_customizations' => $builder_customizations,
            'description' => $description,
            'design_type' => $design_type,
            'uniform_application_type' => $uniformApplicationType,
            'sizes' => $sizes,
            'debug_mode' => $debugMode
        ];
        if (empty( $uniformApplicationType )){
            $data['uniform_application_type'] = "none";
        }
// dd(json_encode($data));
        try {
            // Thumbnail File
            $thumbnailFile = $request->file('thumbnail_path');
            if (isset($thumbnailFile))
            {
                if ($thumbnailFile->isValid())
                {
                    $data['thumbnail_path'] = FileUploader::upload(
                                                    $thumbnailFile,
                                                    $materialName.'_'.$block_pattern_id.'_'.$neck_option,
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
