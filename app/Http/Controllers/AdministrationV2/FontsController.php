<?php

namespace App\Http\Controllers\AdministrationV2;

use \Redirect;
use Session;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use App\APIClients\FontsAPIClient as APIClient;

class FontsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $sportsFilter = 'all';
        $brandsFilter = 'all';

        if (Input::get('sports')) {
            $sportsFilter = Input::get('sports');
        }

        if (Input::get('brand')) {
            $brandsFilter = Input::get('brand');
        }

        $fonts = $this->client->getFilteredFonts($sportsFilter, $brandsFilter);

        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $sports = $categoriesAPIClient->getUniformCategories();

        $user_id = Session::get('userId');

        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);

        // sort sports according to name
        usort($sports, function($currentSport, $nextSport) {
            return strcmp($currentSport->name, $nextSport->name);
        });

        return view('administration-lte-2.fonts.index', [
            'fonts' => $fonts,
            'sports' => $sports,
            'sportsFilter' => $sportsFilter,
            'brandsFilter' => $brandsFilter
        ]);
    }

    public function editFontForm($id)
    {
        $font = $this->client->getFont($id);
        $fonts = $this->client->getDefaultFonts();
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();
        $font->block_pattern_options = str_replace('"', "", $font->block_pattern_options);
        $font->block_patterns = str_replace('"', "", $font->block_patterns);

        return view('administration-lte-2.fonts.edit', [
            'fonts' => $fonts,
            'font' => $font,
            'categories' => $uniformCategories
        ]);
    }

    public function store(Request $request)
    {
        $fontName = $request->input('name');
        $tailSweep = 0;
        $script = 0;
        $blockFont = 0;
        $customizerAvailable = 0;
        $ipadAvailable = 0;


        if($request->input('tail_sweep')){$tailSweep = 1;}
        if($request->input('script')){$script = 1;}
        if($request->input('block_font')){$blockFont = 1;}
        if($request->input('customizer_available')){$customizerAvailable = 1;}
        if($request->input('ipad_available')){$ipadAvailable = 1;}

        $fontType = (empty($request->input('type'))) ? 'default' : $request->input('type');
        $fontParent = $request->input('parent_id');
        $fontProperties = $request->input('font_properties');
        $oldFontPath = $request->input('old_font_path');
        $fontSizeTable = $request->input('font_size_table');
        $sports = explode(",", $request->input('sports_value'));
        $tailSweepProperties = $request->input('tail_sweep_properties');
        $fontSizeTables = $request->input('font_size_tables');
        $sublimatedFontSizeTables = $request->input('sublimated_font_size_tables');
        $alias = $request->input('alias');
        $blockPatternOptions = $request->input('block_pattern_options_value');
        $blockPatterns = $request->input('block_patterns_value');
        $brand = $request->input('brand');
        // dd($request->input('block_patterns_value'));

        $userID = $request->input('user_id');

        $myJson = json_decode($fontProperties, true);

        if( $blockPatternOptions == '' ){
            $blockPatternOptions = null;
        }

        if( $blockPatterns == '' ){
            $blockPatterns = null;
        }

        $fontId = null;
        if (!empty($request->input('font_id')))
        {
            $fontId = $request->input('font_id');
        }

        $data = [
            'name' => $fontName,
            'tail_sweep' => $tailSweep,
            'script' => $script,
            'block_font' => $blockFont,
            'font_size_table' => $fontSizeTable,
            'sports' => $sports,
            'tail_sweep_properties' => $tailSweepProperties,
            'font_size_tables' => $fontSizeTables,
            'sublimated_font_size_tables' => $sublimatedFontSizeTables,
            'updated_by' => $userID,
            'alias' =>$alias,
            'block_pattern_options' => $blockPatternOptions,
            'block_patterns' => $blockPatterns,
            'brand' => $brand,
            'customizer_available' => $customizerAvailable,
            'ipad_available' => $ipadAvailable
        ];

        if ($fontType != 'default')
        {
            $data['type'] = $fontType;
            $data['parent_id'] = $fontParent;
        }

        try
        {
            $randstr = Random::randomize(4);
            $fontFile = $request->file('font_path');
            if (isset($fontFile))
            {
                if ($fontFile->isValid())
                {
                    $data['font_path'] = FileUploader::upload(
                        $fontFile,
                        $fontName.$randstr,
                        'font',
                        'fonts'
                    );
                }
            }
        } catch (S3Exception $e) {
            $message = $e->getMessage();
            return redirect()->route('v1_fonts_index')->with('message', 'There was a problem uploading your files');
        }

        // $myJson['0'] = {};
        $myJson['0']['name'] = $fontName;
        if(isset($data['font_path'])){
            $myJson['0']['font_path'] = $data['font_path'];
        } else {
            $myJson['0']['font_path'] = $oldFontPath;
        }
        $myJson['0']['type'] = $fontType;
        $myJson['0']['parent_id'] = $fontParent;

        try
        {
            $fontLayerFiles = $request->file('fo_file');
            if (!is_null($fontLayerFiles))
            {
                $ctr = 1;
                foreach ($fontLayerFiles as $fontLayerFile) {
                    if (!is_null($fontLayerFile))
                    {
                        if ($fontLayerFile->isValid())
                        {
                            $randstr2 = Random::randomize(4);
                            $fontPropName = $fontName."_".$myJson[(string)$ctr]['name'];
                            $myJson[(string)$ctr]['font_path'] = FileUploader::upload(
                                                                                $fontLayerFile,
                                                                                $fontPropName.$randstr2,
                                                                                'font',
                                                                                'fonts'
                                                                            );
                        }
                    }
                    $ctr++;
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return redirect()->route('v1_fonts_index')->with('message', 'There was a problem uploading your files');
        }
        $data['font_properties'] = json_encode($myJson, JSON_UNESCAPED_SLASHES);

        $response = null;
        if (!empty($fontId))
        {
            Log::info('Attempts to update Font#' . $fontId);
            $data['id'] = $fontId;
            $response = $this->client->updateFont($data);

            return back()->with('message', $response->message);
        }
        else
        {
            Log::info('Attempts to create a new Font ' . json_encode($data));
            $response = $this->client->createFont($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return redirect()->route('v1_fonts_index')->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return redirect()->route('v1_fonts_index')->with('message', 'There was a problem saving your font');
        }
    }

    public function addFontForm()
    {
        $fonts = $this->client->getDefaultFonts();
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();

        return view('administration-lte-2.fonts.create', [
            'fonts' => $fonts,
            'categories' => $uniformCategories
        ]);
    }
}
