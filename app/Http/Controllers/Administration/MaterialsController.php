<?php
namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
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
use App\APIClients\PriceItemTemplatesAPIClient;
use App\APIClients\MaterialsAPIClient as APIClient;
use Illuminate\Support\Facades\Input;

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
    protected $priceItemTemplateClient;

    public function __construct(
        APIClient $apiClient,
        MaterialsOptionsAPIClient $optionsClient,
        ColorsAPIClient $colorsAPIClient,
        FactoriesAPIClient $factoriesAPIClient,
        GradientsAPIClient $gradientsAPIClient,
        ApplicationsAPIClient $applicationsAPIClient,
        BoundariesAPIClient $boundariesAPIClient,
        FontsAPIClient $fontsAPIClient,
        BlockPatternsAPIClient $blockPatternsAPIClient,
        PriceItemTemplatesAPIClient $priceItemTemplatesClient
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
        $this->priceItemTemplateClient = $priceItemTemplatesClient;
    }

    /**
     * Materials
     */
    public function index()
    {
        Log::info('Index');
        $materials = $this->client->getMaterials();
        $block_patterns = $this->blockPatternClient->getBlockPatterns();
        $materials_string = json_encode($materials);

      
        return view('administration.materials.materials', [
            'block_patterns' => $block_patterns,
            'materials' => $materials,
            'materials_string' => $materials_string
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
        
        $front_guide = null;
        $back_guide = null;
        $left_guide = null;
        $right_guide = null;

        foreach($options as $option){
            $default_color = $option->default_color;
            $sublimated_default_color = $option->sublimated_default_color;
            if($option->perspective == "front" && $option->name =="Guide"){
                $front_guide = $option->material_option_path;
            } else if($option->perspective == "back" && $option->name =="Guide"){
                $back_guide = $option->material_option_path;
            } else if($option->perspective == "left" && $option->name =="Guide"){
                $left_guide = $option->material_option_path;
            } else if($option->perspective == "right" && $option->name =="Guide"){
                $right_guide = $option->material_option_path;
            }
            // foreach($colors as $color){
            //     if($color->color_code == $default_color) {
            //         $option->default_hex_code = $color->hex_code;
            //         $option->default_color_name = $color->name;
            //         break;
            //     } else {
            //         $option->default_hex_code = "000";
            //         $option->default_color_name = "Black";
            //     }
            // }
            // foreach($colors as $color){
            //     if($color->color_code == $sublimated_default_color) {
            //         $option->sublimated_default_hex_code = $color->hex_code;
            //         $option->sublimated_default_color_name = $color->name;
            //         break;
            //     } else {
            //         $option->sublimated_default_hex_code = "000";
            //         $option->sublimated_default_color_name = "Black";
            //     }
            // }
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
            'fonts' => $fonts,
            'front_guide' => $front_guide,
            'back_guide' => $back_guide,
            'left_guide' => $left_guide,
            'right_guide' => $right_guide
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

    public function dropZone($id)
    {
        Log::info('Materials Options QS');
        $material = $this->client->getMaterialQS($id);
        $options = $this->optionsClient->getByMaterialId($id);
        return view('administration.materials.add-materials-options-dropzone', [
            'material' => $material,
            'options' => $options,
        ]);

    }

    public function insertDropzoneImage(Request $request){
        $file = $request->file('file');
        $a = explode('\\', $file);
        $b = explode('/', $a[0]);
        $c = end($b);
        if (isset($file))
        {
            if ($file->isValid())
            {
                $randName = Random::randomize(12);
                $loc = FileUploader::upload(
                    $file,
                    $randName,
                    'material_option',
                    "materials",
                    "{$c}.png"
                );

                return $loc;
            }
        }
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
        $price_item_templates = $this->priceItemTemplateClient->getAll();

        $material = $this->client->getMaterial($id);
        return view('administration.materials.material-edit', [
            'material' => $material,
            'uniform_categories' => $uniformCategories,
            'colors' => $colors,
            'factories' => $factories,
            'block_patterns' => $block_patterns,
            'price_item_templates' => $price_item_templates
        ]);
    }

    public function pipings($id)
    {
        $material = $this->client->getMaterial($id);
        return view('administration.materials.material-piping-dynamic', [
            'material' => $material
        ]);
    }

    public function randomFeed($id)
    {
        $material = $this->client->getMaterial($id);
        return view('administration.materials.material-random-feed', [
            'material' => $material
        ]);
    }

    public function editPipingForm($id, $page_number)
    {
        $material = $this->client->getMaterial($id);
        $piping_properties = null;
        $piping_properties_json = null;
        $case = 'new';

        if($page_number == 1 && isset($material->piping_properties))
        {
            $piping_properties = json_decode($material->piping_properties, 1);
            $case = 'update';
            $piping_properties_json = $material->piping_properties;
        }
        elseif($page_number == 2 && isset($material->piping_properties_2))
        {
            $piping_properties = json_decode($material->piping_properties_2, 1);
            $case = 'update';
            $piping_properties_json = $material->piping_properties_2;
        }
        elseif($page_number == 3 && isset($material->piping_properties_3))
        {
            $piping_properties = json_decode($material->piping_properties_3, 1);
            $case = 'update';
            $piping_properties_json = $material->piping_properties_3;
        }
        elseif($page_number == 4 && isset($material->piping_properties_4))
        {
            $piping_properties = json_decode($material->piping_properties_4, 1);
            $case = 'update';
            $piping_properties_json = $material->piping_properties_4;
        }

        return view('administration.materials.material-piping', [
            'material' => $material,
            'piping_properties' => $piping_properties,
            'case' => $case,
            'piping_properties_json' => stripslashes($piping_properties_json),
            'page_number' => $page_number
        ]);
    }

    public function addMaterialForm()
    {
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();
        $block_patterns = $this->blockPatternClient->getBlockPatterns();
        $piTemplates = $this->priceItemTemplateClient->getAll();

        $factories = $this->factoriesClient->getFactories();
        return view('administration.materials.material-create', [
            'uniform_categories' => $uniformCategories,
            'factories' => $factories,
            'block_patterns' => $block_patterns,
            'price_item_templates' => $piTemplates
        ]);
    }

    public function updatePipings(Request $request)
    {
        $material_id = $request->input('material_id');
        $pipings = $request->input('pipings');

        $data = [
            'id' => $material_id,
            'pipings' => $pipings
        ];

        $response = $this->client->updatePipings($data);

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/materials')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/materials')
                            ->with('message', $response->message);
        }
    }

    public function updateRandomFeed(Request $request)
    {
        $material_id = $request->input('material_id');
        $random_feed = $request->input('random_feed');

        $data = [
            'id' => $material_id,
            'random_feed' => $random_feed
        ];
// dd(json_encode($data));
        $response = $this->client->updateRandomFeed($data);

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/materials')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/materials')
                            ->with('message', $response->message);
        }
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
        $sportsGroupId = $request->input('sports_group_id');
        $colorCode = $request->input('color_code');
        $liningType = $request->input('lining_type');
        $uniformApplicationType = $request->input('uniform_application_type');
        $sizes = $request->input('sizes');
        $debugMode = $request->input('debug_mode');
        $assetTarget = $request->input('asset_target');
        $inchInPx = $request->input('one_inch_in_px');
        $isBlank = $request->input('is_blank');
        $isSublimated = $request->input('is_sublimated');
        $isTwill = $request->input('is_twill');
        $isInfused = $request->input('is_infused');
        $status = $request->input('status');
        $slug = FileUploader::makeSlug($materialName);
        $styleGroup = $request->input('style_group');

        if (empty($isSublimated))
        {
            $isSublimated = 0;
        }

        if (empty($isTwill))
        {
            $isTwill = 0;
        }

        if (empty($isInfused))
        {
            $isInfused = 0;
        }

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

        $priceItemTemplateID = $request->input('price_item_template_id');
        $twillPriceItemTemplateID = $request->input('twill_price_item_template_id');
        $sublimatedPriceItemTemplateID = $request->input('sublimated_price_item_template_id');
        $infusedPriceItemTemplateID = $request->input('infused_price_item_template_id');

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
            'sports_group_id' => $sportsGroupId,
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
            'debug_mode' => $debugMode,
            'asset_target' => $assetTarget,
            'price_item_template_id' => $priceItemTemplateID,
            'one_inch_in_px' => $inchInPx,
            'is_blank' => $isBlank,
            'is_sublimated' => $isSublimated,
            'is_twill' => $isTwill,
            'is_infused' => $isInfused,
            'status' => $status,
            'twill_price_item_template_id' => $twillPriceItemTemplateID,
            'sublimated_price_item_template_id' => $sublimatedPriceItemTemplateID,
            'infused_price_item_template_id' => $infusedPriceItemTemplateID,
            'style_group' => $styleGroup
        ];

        try {
            // Thumbnail Files
            $thumbnailFile = $request->file('thumbnail_path');
            $randstr = Random::randomize(6);
            if (isset($thumbnailFile))
            {
                if ($thumbnailFile->isValid())
                {
                    $data['thumbnail_path'] = FileUploader::upload(
                                                    $thumbnailFile,
                                                    $materialName.'_'.$block_pattern_id.'_'.$neck_option.$randstr,
                                                    'thumbnail'
                                                );
                }
            }

            $thumbnailFileFront = $request->file('thumbnail_path_front');
            if (isset($thumbnailFileFront))
            {
                if ($thumbnailFileFront->isValid())
                {
                    $data['thumbnail_path_front'] = FileUploader::upload(
                                                    $thumbnailFileFront,
                                                    $materialName.'_'.$block_pattern_id.'_'.$neck_option.'_front'.$randstr,
                                                    'thumbnail'
                                                );
                }
            }

            $thumbnailFileBack = $request->file('thumbnail_path_back');
            if (isset($thumbnailFileBack))
            {
                if ($thumbnailFileBack->isValid())
                {
                    $data['thumbnail_path_back'] = FileUploader::upload(
                                                    $thumbnailFileBack,
                                                    $materialName.'_'.$block_pattern_id.'_'.$neck_option.'_back'.$randstr,
                                                    'thumbnail'
                                                );
                }
            }

            $thumbnailFileLeft = $request->file('thumbnail_path_left');
            if (isset($thumbnailFileLeft))
            {
                if ($thumbnailFileLeft->isValid())
                {
                    $data['thumbnail_path_left'] = FileUploader::upload(
                                                    $thumbnailFileLeft,
                                                    $materialName.'_'.$block_pattern_id.'_'.$neck_option.'_left'.$randstr,
                                                    'thumbnail'
                                                );
                }
            }

            $thumbnailFileRight = $request->file('thumbnail_path_right');
            if (isset($thumbnailFileRight))
            {
                if ($thumbnailFileRight->isValid())
                {
                    $data['thumbnail_path_right'] = FileUploader::upload(
                                                    $thumbnailFileRight,
                                                    $materialName.'_'.$block_pattern_id.'_'.$neck_option.'_right'.$randstr,
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
                $randstr = Random::randomize(12);
                // Front View File
                $frontViewFile = $request->file('front_view_path');
                if (isset($frontViewFile))
                {
                    if ($frontViewFile->isValid())
                    {
                        $data['front_view_path'] = FileUploader::upload(
                                                        $frontViewFile,
                                                        $materialName.$randstr,
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
                                                        $materialName.$randstr,
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
                                                        $materialName.$randstr,
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
                                                        $materialName.$randstr,
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
                                                        $materialName.$randstr,
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
                                                        $materialName.$randstr,
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
                                                        $materialName.$randstr,
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
                                                        $materialName.$randstr,
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
