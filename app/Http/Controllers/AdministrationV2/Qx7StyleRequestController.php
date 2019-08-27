<?php
namespace App\Http\Controllers\AdministrationV2;

use App\APIClients\ApplicationsAPIClient;
use App\APIClients\BoundariesAPIClient;
use App\APIClients\ColorsAPIClient;
use App\APIClients\FontsAPIClient;
use App\APIClients\GradientsAPIClient;
use App\APIClients\MaterialsOptionsAPIClient;
use App\APIClients\StylesAPIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Qx7APIClient\RulesClient;
use App\Utilities\Log;
use Illuminate\Http\Request;
use \Redirect;
use \Session;

class Qx7StyleRequestController extends Controller
{
    protected $applicationsAPIClient;
    protected $boundaryClient;
    protected $colorsClient;
    protected $fontClient;
    protected $gradientClient;
    protected $optionsClient;
    protected $stylesClient;
    protected $rulesClient;

    public function __construct(
        // APIClient $apiClient
        ApplicationsAPIClient $applicationsAPIClient,
        BoundariesAPIClient $boundariesAPIClient,
        ColorsAPIClient $colorsAPIClient,
        FontsAPIClient $fontsAPIClient,
        GradientsAPIClient $gradientsAPIClient,
        MaterialsOptionsAPIClient $optionsClient,
        StylesAPIClient $stylesClient,
        RulesClient $rulesClient
    )
    {
        // $this->client = $apiClient;
        $this->applicationClient = $applicationsAPIClient;
        $this->boundaryClient = $boundariesAPIClient;
        $this->colorsClient = $colorsAPIClient;
        $this->fontClient = $fontsAPIClient;
        $this->gradientClient = $gradientsAPIClient;
        $this->optionsClient = $optionsClient;
        $this->stylesClient = $stylesClient;
        $this->rulesClient = $rulesClient;
    }

    public function index()
    {
        return view('administration-lte-2.qx7-style-requests.index');
    }

    public function show($id)
    {
        return view('administration-lte-2.qx7-style-requests.view', compact('id'));
    }

    public function createStyle($id)
    {
        return view('administration-lte-2.qx7-style-requests.create-style', compact('id'));
    }

    public function dropZone($id)
    {
        return view('administration-lte-2.qx7-style-requests.option-dropzone', compact('id'));
    }

    public function getOptions($id)
    {

        $style = $this->stylesClient->getStyle($id);
        $options = $this->optionsClient->getByStyleId($id);
        $colors = $this->colorsClient->getColors("prolook");
        $applications = $this->applicationClient->getApplications();
        $boundaries = $this->boundaryClient->getBoundaries();
        $fonts = $this->fontClient->getFilteredFonts("Football", "prolook");

        $front_guide = null;
        $back_guide = null;
        $left_guide = null;
        $right_guide = null;

        foreach($options as $option) {
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
        }

        $gradients = $this->gradientClient->getGradients();

        return view('administration-lte-2.qx7-style-requests.view-options', [
            'options' => $options,
            'colors' => $colors,
            'gradients' => $gradients,
            'applications' => $applications,
            'boundaries' => $boundaries,
            'fonts' => $fonts,
            'front_guide' => $front_guide,
            'back_guide' => $back_guide,
            'left_guide' => $left_guide,
            'right_guide' => $right_guide,
            'style' => $style
        ]);
    }

    public function getStyleApplication($id)
    {
        $materialOption = $this->optionsClient->getMaterialOption($id);
        $options = $this->optionsClient->getByStyleId($materialOption->style_id);
        $style = $this->stylesClient->getStyle($materialOption->style_id);
        $guide = null;
        $highlightPath = null;

        foreach ($options as $option) {
            if ($materialOption->perspective == $option->perspective) {
                if ($option->name == 'Guide') {
                    $guide = $option->material_option_path;
                }

                if ($option->setting_type == 'highlights') {
                    $highlightPath = $option->material_option_path;
                }
            }
        }

        $applications = $this->applicationClient->getApplications();

        $fonts = $this->rulesClient->getFonts($style->rule_id);

        return view('administration-lte-2.qx7-style-requests.style-application', compact(
            'materialOption',
            'guide',
            'highlightPath',
            'applications',
            'fonts',
            'style'
        ));
    }

    public function saveApplications(Request $request)
    {
        $styleID = $request->input('material_id');
        $materialOptionId = $request->input('app_material_option_id');

        $applications_properties = $request->input('applications_properties');

        $data = [
            'id' => $materialOptionId,
            'style_id' => $styleID,
            'applications_properties' => $applications_properties
        ];

        $response = null;
        if (!empty($materialOptionId)) {
            Log::info('Attempts to update MaterialOption#' . $materialOptionId);
            $data['id'] = $materialOptionId;
            $response = $this->optionsClient->updateApplications($data);
        }

        if ($response->success) {
            Log::info('Success');
            return redirect()->route('v1_qx7_style_application', ['id' => $materialOptionId])->with('flash_message_success', $response->message);
        } else {
            Log::info('Failed');
            return redirect()->route('v1_qx7_style_application', ['id' => $materialOptionId])->with('flash_message_error', 'There was a problem saving your material option');
        }
    }

    public function styleOptionsSetup($id)
    {
        // $material = $this->client->getMaterialQS($id);
        $style = $this->stylesClient->getStyle($id);
        $options = $this->optionsClient->getByStyleId($id);

        return view('administration-lte-2.qx7-style-requests.style-options-setup', [
            'style' => $style,
            'options' => $options,
        ]);
    }

    public function importBoundingBox(Request $request)
    {
        $response = $this->optionsClient->importBoundingBox($request->all());

        if ($response->success) {
            return redirect()->route('v1_qx7_style_options', ['id' => $request->style_id])->with('message', 'Successfully imported bounding box');
        }

        return redirect()->route('v1_qx7_style_options', ['id' => $request->style_id])->with('errors', 'Failed importing bounding box');
    }

    public function matchRulePartName(Request $request)
    {
        $response = $this->optionsClient->matchRulePartName($request->all());

        if ($response->success) {
            return redirect()->route('v1_qx7_style_options', ['id' => $request->style_id])->with('message', $response->message);
        }

        return redirect()->route('v1_qx7_style_options', ['id' => $request->style_id])->with('errors', $response->message);
    }

    public function saveOption(Request $request)
    {
        $styleId = $request->input('material_id');
        $materialOptionId = $request->input('material_option_id');
        $materialObject = null;
        $patternId = $request->input('pattern_id');
        $pattern_properties = $request->input('pattern_properties');

        if (!is_null($styleId))
        {
            $style = $this->stylesClient->getStyle($styleId);
        }

        $materialFolder = null;

        if (!is_null($materialObject))
        {
            $materialFolder = $materialObject->slug;
        }

        $materialOptionName = $request->input('name');
        $settingType = $request->input('setting_type');
        $partType = $request->input('part_type');
        $layerLevel = $request->input('layer_level');
        $teamColorId = $request->input('team_color_id');
        $groupId = $request->input('group_id');
        $defaultColor = $request->input('default_color');
        $sublimatedDefaultColor = $request->input('sublimated_default_color');
        $perspective = $request->input('perspective');
        $colors = $request->input('colors');
        $sublimated_colors = $request->input('sublimated_colors');
        $gradients = $request->input('gradients');
        $is_blend = is_null($request->input('is_blend')) ? 0 : 1;
        $allow_pattern = is_null($request->input('allow_pattern')) ? 0 : 1;
        $allow_gradient = is_null($request->input('allow_gradient')) ? 0 : 1;
        $allow_color = is_null($request->input('allow_color')) ? 0 : 1;
        $boundary_properties = $request->input('boundary_properties');
        $applications_properties = $request->input('applications_properties');
        $default_display = $request->input('default_display');
        $build_type = $request->input('build_type');
        $pattern_opacity = $request->input('pattern_opacity');
        $fabric_id = $request->input('fabric_id');
        $insert_fabric = $request->input('insert_fabric');
        $base_fabric = $request->input('base_fabric');
        $sleeve_fabric = $request->input('sleeve_fabric');

        if ($request->input('default_asset') == 'on') {
            $default_asset = true;
        } else {
            $default_asset = false;
        }

        if( is_null($default_display) ){
            $default_display = "color";
        }

        $data = [
            'material_id' => $styleId,
            'name' => $materialOptionName,
            'setting_type' => $settingType,
            // 'origin' => $origin,
            'layer_level' => $layerLevel,
            'team_color_id' => $teamColorId,
            'group_id' => $groupId,
            'default_color' => $defaultColor,
            'sublimated_default_color' => $sublimatedDefaultColor,
            'perspective' => $perspective,
            'colors' => $colors,
            'sublimated_colors' => $sublimated_colors,
            'gradients' => $gradients,
            'is_blend' => $is_blend,
            'allow_pattern' => $allow_pattern,
            'allow_gradient' => $allow_gradient,
            'allow_color' => $allow_color,
            'boundary_properties' => $boundary_properties,
            'applications_properties' => $applications_properties,
            'pattern_id' => $patternId,
            'pattern_properties' => $pattern_properties,
            'default_display' => $default_display,
            'build_type' => $build_type,
            'part_type' => $partType,
            'pattern_opacity' => $pattern_opacity,
            'default_asset' => $default_asset,
            'fabric_id' => $fabric_id,
            'base_fabric' => $base_fabric,
            'insert_fabric' => $insert_fabric,
            'sleeve_fabric' => $sleeve_fabric,
            'style_id' => $styleId,

        ];

        try {
            $materialOptionFile = $request->file('material_option_path');

            if (!is_null($materialOptionFile)) {
                if ($materialOptionFile->isValid()) {
                    $filename = Random::randomize(12);
                    $data['material_option_path'] = FileUploader::upload(
                                                                $materialOptionFile,
                                                                $materialOptionName,
                                                                'material_option',
                                                                "materials",
                                                                "{$materialFolder}/options/{$settingType}/{$filename}.png"
                                                            );
                }
            }
        }  catch (S3Exception $e) {
            $message = $e->getMessage();
            return Redirect::to('/administration/v1-0/qx7_style_requests')
                            ->with('message', 'There was a problem uploading your files');
        }

        $response = null;

        if (! empty($materialOptionId)) {
            Log::info('Attempts to update MaterialOption#' . $materialOptionId);
            $data['id'] = $materialOptionId;
            $response = $this->optionsClient->update($data);
        } else {
            Log::info('Attempts to create a new Material Option ' . json_encode($data));
            $response = $this->optionsClient->create($data);
        }

        if ($response->success) {
            Log::info('Success');
            return Redirect::to('/administration/v1-0/qx7_style_requests/view_options/'.$data['style_id'])
                            ->with('message', $response->message);
        } else {
            Log::info('Failed');
            return Redirect::to('/administration/v1-0/qx7_style_requests/view_options/'.$data['style_id'])
                            ->with('message', 'There was a problem saving your material option');
        }
    }

    public function updateOption(Request $request)
    {
        $data = [];
        $optionIds = $request->input('option_id');
        $optionLayerLevels = $request->input('layer_level');
        $optionNames = $request->input('name');
        $materialID = $request->input('cleanup_material_id');
        $groupIDs = $request->input('group_id');
        $teamColorIDs = $request->input('team_color_id');
        $deafaultColors = $request->input('default_color');
        $allowPatterns = $request->input('allow_pattern');

        $ctr = 0;
        foreach ($optionIds as $optionId) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['info'][$item] = [
                'id' => $optionId,
            ];
            $ctr++;
        }

        $ctr = 0;
        foreach ($optionLayerLevels as $optionLayerLevel) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['info'][$item]['layer_level'] = $optionLayerLevel;
            $ctr++;
        }

        $ctr = 0;
        foreach ($optionNames as $optionName) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['info'][$item]['name'] = $optionName;
            $ctr++;
        }

        $ctr = 0;
        foreach ($groupIDs as $groupID) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['info'][$item]['group_id'] = $groupID;
            $ctr++;
        }

        $ctr = 0;
        foreach ($teamColorIDs as $teamColorID) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['info'][$item]['team_color_id'] = $teamColorID;
            $ctr++;
        }

        $ctr = 0;
        foreach ($deafaultColors as $color) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['info'][$item]['default_color'] = $color;
            $ctr++;
        }

        $ctr = 0;
        foreach ($allowPatterns as $allow) {
            $idx = $ctr;
            $item = 'item'.$ctr;
            $data['info'][$item]['allow_pattern'] = $allow;
            $ctr++;
        }

        $data['input'] = json_encode($data['info']);
        $response = null;

        $response = $this->optionsClient->updateMaterialOptions($data);

        return redirect()->route('v1_qx7_style_options_setup', ['id' => $materialID])->with('message', 'Update saved');

    }

    public function saveBoundary(Request $request)
    {
        $styleId = $request->input('material_id');
        $materialOptionId = $request->input('material_option_id');
        $materialObject = null;

        $boundary_properties = $request->input('boundary_properties');

        $data = [
            'id' => $materialOptionId,
            'material_id' => $styleId,
            'boundary_properties' => $boundary_properties,
            'style_id' => $styleId
        ];

        $response = null;
        if (!empty($materialOptionId)) {
            Log::info('Attempts to update MaterialOption#' . $materialOptionId);
            $data['id'] = $materialOptionId;
            $response = $this->optionsClient->updateBoundary($data);
        }

        if ($response->success) {
            Log::info('Success');
            return redirect()->route('v1_qx7_style_options', ['id' => $data['style_id']])->with('message', $response->message);
        } else {
            Log::info('Failed');
            return redirect()->route('v1_qx7_style_options', ['id' => $data['style_id']])->with('message', 'There was a problem saving your material option');
        }
    }

    public function purgeOption(Request $request)
    {
        $mo_material_id = $request->input('cleanup_material_id');
        $data = [
            'id' => $mo_material_id
        ];

        Log::info('Attempts to cleanup properties' . json_encode($data));
        $response = $this->optionsClient->purge($data);

        return Redirect::to('/administration/v1-0/qx7_style_requests/view_options/'.$mo_material_id);
    }

    public function pipings($id)
    {
        $style = $this->stylesClient->getStyle($id);
        return view('administration-lte-2.qx7-style-requests.style-piping-dynamic', [
            'style' => $style
        ]);
    }

    public function updatePipings(Request $request)
    {
        $style_id = $request->input('style_id');
        $pipings = $request->input('pipings');

        $data = [
            'id' => $style_id,
            'pipings' => $pipings
        ];

        $response = $this->stylesClient->updatePipings($data);

        if ($response->success) {
            Log::info('Success');
            return Redirect::to('administration/v1-0/qx7_style_requests/pipings/' . $style_id )
                    ->with('message', 'Successfully saved changes');
        } else {
            Log::info('Failed');
            return Redirect::to('administration/v1-0/qx7_style_requests/pipings/' . $style_id )
                    ->with('message', $response->message);
        }
    }

    public function gradient($id)
    {
        $style = $this->stylesClient->getStyle($id);
        return view('administration-lte-2.qx7-style-requests.style-gradient', [
            'style' => $style
        ]);
    }

    public function updateGradient(Request $request)
    {
        $style_id = $request->input('style_id');
        $gradient = $request->input('gradient');

        $data = [
            'id' => $style_id,
            'gradient' => $gradient
        ];

        $response = $this->stylesClient->updateGradient($data);

        if ($response->success) {
            Log::info('Success');
            return Redirect::to('administration/v1-0/qx7_style_requests/gradient/' . $style_id)
                    ->with('message', 'Successfully saved changes');
        } else {
            Log::info('Failed');
            return Redirect::to('administration/v1-0/qx7_style_requests/gradient/' . $style_id)
                    ->with('message', $response->message);
        }
    }
}
