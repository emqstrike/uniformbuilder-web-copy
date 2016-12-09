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


    public function editPipingForm($id)
    {
        $material = $this->client->getMaterial($id);
        $piping_properties = null;
        $case = 'new';
        if(isset($material->piping_properties))
        {
            $piping_properties = json_decode($material->piping_properties, 1);
            $case = 'update';
        }

        return view('administration.materials.material-piping', [
            'material' => $material,
            'piping_properties' => $piping_properties,
            'case' => $case,
            'piping_properties_json' => stripslashes($material->piping_properties)
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

    public function updatePiping(Request $request)
    {
        $material_id = $request->input('material_id');
        $name_oe = $request->input('name_oe');
        $name_of = $request->input('name_of');
        $name_oh = $request->input('name_oh');
        $case = $request->input('case');

        $set = "Piping";

        $data = [];
        $structured_data = [
            'material_id' => $material_id
        ];

        if($case === 'new')
        {
            $structured_data['1/8'] = [];
            $structured_data['1/8']['name'] = $name_oe;
            $structured_data['1/8']['set'] = $set;
            $structured_data['1/8']['front_pos_1'] = null;
            $structured_data['1/8']['back_pos_1'] = null;
            $structured_data['1/8']['left_pos_1'] = null;
            $structured_data['1/8']['right_pos_1'] = null;
            $structured_data['1/8']['front_pos_2'] = null;
            $structured_data['1/8']['back_pos_2'] = null;
            $structured_data['1/8']['left_pos_2'] = null;
            $structured_data['1/8']['right_pos_2'] = null;
            $structured_data['1/8']['front_pos_3'] = null;
            $structured_data['1/8']['back_pos_3'] = null;
            $structured_data['1/8']['left_pos_3'] = null;
            $structured_data['1/8']['right_pos_3'] = null;

            $structured_data['1/4'] = [];
            $structured_data['1/4']['name'] = $name_of;
            $structured_data['1/4']['set'] = $set;
            $structured_data['1/4']['front_pos_1'] = null;
            $structured_data['1/4']['back_pos_1'] = null;
            $structured_data['1/4']['left_pos_1'] = null;
            $structured_data['1/4']['right_pos_1'] = null;
            $structured_data['1/4']['front_pos_2'] = null;
            $structured_data['1/4']['back_pos_2'] = null;
            $structured_data['1/4']['left_pos_2'] = null;
            $structured_data['1/4']['right_pos_2'] = null;
            $structured_data['1/4']['front_pos_3'] = null;
            $structured_data['1/4']['back_pos_3'] = null;
            $structured_data['1/4']['left_pos_3'] = null;
            $structured_data['1/4']['right_pos_3'] = null;

            $structured_data['1/2'] = [];
            $structured_data['1/2']['name'] = $name_oh;
            $structured_data['1/2']['set'] = $set;
            $structured_data['1/2']['front_pos_1'] = null;
            $structured_data['1/2']['back_pos_1'] = null;
            $structured_data['1/2']['left_pos_1'] = null;
            $structured_data['1/2']['right_pos_1'] = null;
            $structured_data['1/2']['front_pos_2'] = null;
            $structured_data['1/2']['back_pos_2'] = null;
            $structured_data['1/2']['left_pos_2'] = null;
            $structured_data['1/2']['right_pos_2'] = null;
            $structured_data['1/2']['front_pos_3'] = null;
            $structured_data['1/2']['back_pos_3'] = null;
            $structured_data['1/2']['left_pos_3'] = null;
            $structured_data['1/2']['right_pos_3'] = null;
        } else {
            $structured_data = json_decode($request->input('piping_properties_json'), 1);
            $structured_data['1/8']['name'] = $name_oe;
            $structured_data['1/8']['set'] = $set;
            $structured_data['1/4']['name'] = $name_of;
            $structured_data['1/4']['set'] = $set;
            $structured_data['1/2']['name'] = $name_oh;
            $structured_data['1/2']['set'] = $set;
        }
        // Upload images
        try {
            // 1/8 SIZES
            /* POSITION 1 */
            $f_position_1_18 = $request->file('f_position_1_18');
            if (isset($f_position_1_18))
            {
                if ($f_position_1_18->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['f_position_1_18'] = FileUploader::upload(
                                                    $f_position_1_18,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/8']['front_pos_1'] = $data['f_position_1_18'];
                }
            }
            $b_position_1_18 = $request->file('b_position_1_18');
            if (isset($b_position_1_18))
            {
                if ($b_position_1_18->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['b_position_1_18'] = FileUploader::upload(
                                                    $b_position_1_18,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/8']['back_pos_1'] = $data['b_position_1_18'];
                }
            }

            $l_position_1_18 = $request->file('l_position_1_18');
            if (isset($l_position_1_18))
            {
                if ($l_position_1_18->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['l_position_1_18'] = FileUploader::upload(
                                                    $l_position_1_18,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/8']['left_pos_1'] = $data['l_position_1_18'];
                }
            }

            $r_position_1_18 = $request->file('r_position_1_18');
            if (isset($r_position_1_18))
            {
                if ($r_position_1_18->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['r_position_1_18'] = FileUploader::upload(
                                                    $r_position_1_18,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/8']['right_pos_1'] = $data['r_position_1_18'];
                }
            }
            /* POSITION 2 */
            $f_position_2_18 = $request->file('f_position_2_18');
            if (isset($f_position_2_18))
            {
                if ($f_position_2_18->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['f_position_2_18'] = FileUploader::upload(
                                                    $f_position_2_18,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/8']['front_pos_2'] = $data['f_position_2_18'];
                }
            }
            $b_position_2_18 = $request->file('b_position_2_18');
            if (isset($b_position_2_18))
            {
                if ($b_position_2_18->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['b_position_2_18'] = FileUploader::upload(
                                                    $b_position_2_18,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/8']['back_pos_2'] = $data['b_position_2_18'];
                }
            }
            
            $l_position_2_18 = $request->file('l_position_2_18');
            if (isset($l_position_2_18))
            {
                if ($l_position_2_18->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['l_position_2_18'] = FileUploader::upload(
                                                    $l_position_2_18,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/8']['left_pos_2'] = $data['l_position_2_18'];
                }
            }

            $r_position_2_18 = $request->file('r_position_2_18');
            if (isset($r_position_2_18))
            {
                if ($r_position_2_18->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['r_position_2_18'] = FileUploader::upload(
                                                    $r_position_2_18,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/8']['right_pos_2'] = $data['r_position_2_18'];
                }
            }
            /* POSITION 3 */
            $f_position_3_18 = $request->file('f_position_3_18');
            if (isset($f_position_3_18))
            {
                if ($f_position_3_18->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['f_position_3_18'] = FileUploader::upload(
                                                    $f_position_3_18,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/8']['front_pos_3'] = $data['f_position_3_18'];
                }
            }
            $b_position_3_18 = $request->file('b_position_3_18');
            if (isset($b_position_3_18))
            {
                if ($b_position_3_18->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['b_position_3_18'] = FileUploader::upload(
                                                    $b_position_3_18,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/8']['back_pos_3'] = $data['b_position_3_18'];
                }
            }
            
            $l_position_3_18 = $request->file('l_position_3_18');
            if (isset($l_position_3_18))
            {
                if ($l_position_3_18->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['l_position_3_18'] = FileUploader::upload(
                                                    $l_position_3_18,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/8']['left_pos_3'] = $data['l_position_3_18'];
                }
            }

            $r_position_3_18 = $request->file('r_position_3_18');
            if (isset($r_position_3_18))
            {
                if ($r_position_3_18->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['r_position_3_18'] = FileUploader::upload(
                                                    $r_position_3_18,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/8']['right_pos_3'] = $data['r_position_3_18'];
                }
            }
            // 1/4 SIZES
            /* POSITION 1 */
            $f_position_1_14 = $request->file('f_position_1_14');
            if (isset($f_position_1_14))
            {
                if ($f_position_1_14->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['f_position_1_14'] = FileUploader::upload(
                                                    $f_position_1_14,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/4']['front_pos_1'] = $data['f_position_1_14'];
                }
            }
            $b_position_1_14 = $request->file('b_position_1_14');
            if (isset($b_position_1_14))
            {
                if ($b_position_1_14->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['b_position_1_14'] = FileUploader::upload(
                                                    $b_position_1_14,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/4']['back_pos_1'] = $data['b_position_1_14'];
                }
            }

            $l_position_1_14 = $request->file('l_position_1_14');
            if (isset($l_position_1_14))
            {
                if ($l_position_1_14->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['l_position_1_14'] = FileUploader::upload(
                                                    $l_position_1_14,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/4']['left_pos_1'] = $data['l_position_1_14'];
                }
            }

            $r_position_1_14 = $request->file('r_position_1_14');
            if (isset($r_position_1_14))
            {
                if ($r_position_1_14->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['r_position_1_14'] = FileUploader::upload(
                                                    $r_position_1_14,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/4']['right_pos_1'] = $data['r_position_1_14'];
                }
            }
            /* POSITION 2 */
            $f_position_2_14 = $request->file('f_position_2_14');
            if (isset($f_position_2_14))
            {
                if ($f_position_2_14->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['f_position_2_14'] = FileUploader::upload(
                                                    $f_position_2_14,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/4']['front_pos_2'] = $data['f_position_2_14'];
                }
            }
            $b_position_2_14 = $request->file('b_position_2_14');
            if (isset($b_position_2_14))
            {
                if ($b_position_2_14->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['b_position_2_14'] = FileUploader::upload(
                                                    $b_position_2_14,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/4']['back_pos_2'] = $data['b_position_2_14'];
                }
            }
            
            $l_position_2_14 = $request->file('l_position_2_14');
            if (isset($l_position_2_14))
            {
                if ($l_position_2_14->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['l_position_2_14'] = FileUploader::upload(
                                                    $l_position_2_14,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/4']['left_pos_2'] = $data['l_position_2_14'];
                }
            }

            $r_position_2_14 = $request->file('r_position_2_14');
            if (isset($r_position_2_14))
            {
                if ($r_position_2_14->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['r_position_2_14'] = FileUploader::upload(
                                                    $r_position_2_14,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/4']['right_pos_2'] = $data['r_position_2_14'];
                }
            }
            /* POSITION 3 */
            $f_position_3_14 = $request->file('f_position_3_14');
            if (isset($f_position_3_14))
            {
                if ($f_position_3_14->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['f_position_3_14'] = FileUploader::upload(
                                                    $f_position_3_14,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/4']['front_pos_3'] = $data['f_position_3_14'];
                }
            }
            $b_position_3_14 = $request->file('b_position_3_14');
            if (isset($b_position_3_14))
            {
                if ($b_position_3_14->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['b_position_3_14'] = FileUploader::upload(
                                                    $b_position_3_14,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/4']['back_pos_3'] = $data['b_position_3_14'];
                }
            }
            
            $l_position_3_14 = $request->file('l_position_3_14');
            if (isset($l_position_3_14))
            {
                if ($l_position_3_14->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['l_position_3_14'] = FileUploader::upload(
                                                    $l_position_3_14,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/4']['left_pos_3'] = $data['l_position_3_14'];
                }
            }

            $r_position_3_14 = $request->file('r_position_3_14');
            if (isset($r_position_3_14))
            {
                if ($r_position_3_14->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['r_position_3_14'] = FileUploader::upload(
                                                    $r_position_3_14,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/4']['right_pos_3'] = $data['r_position_3_14'];
                }
            }
            // 1/2 SIZES
            /* POSITION 1 */
            $f_position_1_12 = $request->file('f_position_1_12');
            if (isset($f_position_1_12))
            {
                if ($f_position_1_12->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['f_position_1_12'] = FileUploader::upload(
                                                    $f_position_1_12,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/2']['front_pos_1'] = $data['f_position_1_12'];
                }
            }
            $b_position_1_12 = $request->file('b_position_1_12');
            if (isset($b_position_1_12))
            {
                if ($b_position_1_12->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['b_position_1_12'] = FileUploader::upload(
                                                    $b_position_1_12,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/2']['back_pos_1'] = $data['b_position_1_12'];
                }
            }
            
            $l_position_1_12 = $request->file('l_position_1_12');
            if (isset($l_position_1_12))
            {
                if ($l_position_1_12->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['l_position_1_12'] = FileUploader::upload(
                                                    $l_position_1_12,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/2']['left_pos_1'] = $data['l_position_1_12'];
                }
            }

            $r_position_1_12 = $request->file('r_position_1_12');
            if (isset($r_position_1_12))
            {
                if ($r_position_1_12->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['r_position_1_12'] = FileUploader::upload(
                                                    $r_position_1_12,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/2']['right_pos_1'] = $data['r_position_1_12'];
                }
            }
            /* POSITION 2 */
            $f_position_2_12 = $request->file('f_position_2_12');
            if (isset($f_position_2_12))
            {
                if ($f_position_2_12->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['f_position_2_12'] = FileUploader::upload(
                                                    $f_position_2_12,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/2']['front_pos_2'] = $data['f_position_2_12'];
                }
            }
            $b_position_2_12 = $request->file('b_position_2_12');
            if (isset($b_position_2_12))
            {
                if ($b_position_2_12->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['b_position_2_12'] = FileUploader::upload(
                                                    $b_position_2_12,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/2']['back_pos_2'] = $data['b_position_2_12'];
                }
            }
            
            $l_position_2_12 = $request->file('l_position_2_12');
            if (isset($l_position_2_12))
            {
                if ($l_position_2_12->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['l_position_2_12'] = FileUploader::upload(
                                                    $l_position_2_12,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/2']['left_pos_2'] = $data['l_position_2_12'];
                }
            }

            $r_position_2_12 = $request->file('r_position_2_12');
            if (isset($r_position_2_12))
            {
                if ($r_position_2_12->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['r_position_2_12'] = FileUploader::upload(
                                                    $r_position_2_12,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/2']['right_pos_2'] = $data['r_position_2_12'];
                }
            }
            /* POSITION 3 */
            $f_position_3_12 = $request->file('f_position_3_12');
            if (isset($f_position_3_12))
            {
                if ($f_position_3_12->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['f_position_3_12'] = FileUploader::upload(
                                                    $f_position_3_12,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/2']['front_pos_3'] = $data['f_position_3_12'];
                }
            }
            $b_position_3_12 = $request->file('b_position_3_12');
            if (isset($b_position_3_12))
            {
                if ($b_position_3_12->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['b_position_3_12'] = FileUploader::upload(
                                                    $b_position_3_12,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/2']['back_pos_3'] = $data['b_position_3_12'];
                }
            }

            $l_position_3_12 = $request->file('l_position_3_12');
            if (isset($l_position_3_12))
            {
                if ($l_position_3_12->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['l_position_3_12'] = FileUploader::upload(
                                                    $l_position_3_12,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/2']['left_pos_3'] = $data['l_position_3_12'];
                }
            }

            $r_position_3_12 = $request->file('r_position_3_12');
            if (isset($r_position_3_12))
            {
                if ($r_position_3_12->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['r_position_3_12'] = FileUploader::upload(
                                                    $r_position_3_12,
                                                    $randstr,
                                                    'material_option',
                                                    'material_pipings',
                                                    $randstr.".png"
                                                );
                    $structured_data['1/2']['right_pos_3'] = $data['r_position_3_12'];
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            dd($message);
        }

        $response = null;
        if (!empty($material_id))
        {
            Log::info('Attempts to update piping_properties of Material#' . $material_id);
            $response = $this->client->updatePiping($structured_data);
        }

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
        $colorCode = $request->input('color_code');
        $liningType = $request->input('lining_type');
        $uniformApplicationType = $request->input('uniform_application_type');
        $sizes = $request->input('sizes');
        $debugMode = $request->input('debug_mode');
        $assetTarget = $request->input('asset_target');
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
            'debug_mode' => $debugMode,
            'asset_target' => $assetTarget
        ];
// dd($data);
        try {
            // Thumbnail Files
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

            $thumbnailFileBack = $request->file('thumbnail_path_back');
            if (isset($thumbnailFileBack))
            {
                if ($thumbnailFileBack->isValid())
                {
                    $data['thumbnail_path_back'] = FileUploader::upload(
                                                    $thumbnailFileBack,
                                                    $materialName.'_'.$block_pattern_id.'_'.$neck_option.'_back',
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
                                                    $materialName.'_'.$block_pattern_id.'_'.$neck_option.'_left',
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
                                                    $materialName.'_'.$block_pattern_id.'_'.$neck_option.'_right',
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
