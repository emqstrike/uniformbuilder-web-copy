<?php
namespace App\Http\Controllers\AdministrationV2;

use App\APIClients\ApplicationsAPIClient;
use App\APIClients\BoundariesAPIClient;
use App\APIClients\ColorsAPIClient;
use App\APIClients\FontsAPIClient;
use App\APIClients\GradientsAPIClient;
use App\APIClients\MaterialsOptionsAPIClient;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Qx7StyleRequestController extends Controller
{
    protected $applicationsAPIClient;
    protected $boundaryClient;
    protected $colorsClient;
    protected $fontClient;
    protected $gradientClient;
    protected $optionsClient;

    public function __construct(
        // APIClient $apiClient
        ApplicationsAPIClient $applicationsAPIClient,
        BoundariesAPIClient $boundariesAPIClient,
        ColorsAPIClient $colorsAPIClient,
        FontsAPIClient $fontsAPIClient,
        GradientsAPIClient $gradientsAPIClient,
        MaterialsOptionsAPIClient $optionsClient
    )
    {
        // $this->client = $apiClient;
        $this->applicationClient = $applicationsAPIClient;
        $this->boundaryClient = $boundariesAPIClient;
        $this->colorsClient = $colorsAPIClient;
        $this->fontClient = $fontsAPIClient;
        $this->gradientClient = $gradientsAPIClient;
        $this->optionsClient = $optionsClient;
    }

    public function index()
    {
        return view('administration-lte-2.qx7-style-requests.index');
    }

    public function show($id)
    {
        return view('administration-lte-2.qx7-style-requests.view');
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
        $options = $this->optionsClient->getByStyleId($id);
        $colors = $this->colorsClient->getColors("prolook");

        $applications = $this->applicationClient->getApplications();
        $boundaries = $this->boundaryClient->getBoundaries();
        $fonts = $this->fontClient->getFilteredFonts("Baseball", "prolook");

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
        }

        $gradients = $this->gradientClient->getGradients();
        $id = 1;
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
            'style_id' => $id

        ]);
    }

    public function getStyleApplication($id)
    {
        $materialOption = $this->optionsClient->getMaterialOption($id);
        $options = $this->optionsClient->getByStyleId($materialOption->style_id);
        // $material = $this->materialClient->getMaterial($materialOption->material_id);
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
        $fonts = $this->fontClient->getFonts();
        $style_id = 1;
        return view('administration-lte-2.master-pages.materials.style-application', compact(
            'materialOption',
            'guide',
            'highlightPath',
            'applications',
            'fonts',
            'style_id'
        ));
    }
}
