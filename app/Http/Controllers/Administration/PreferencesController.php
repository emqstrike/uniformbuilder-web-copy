<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;
use App\APIClients\ColorsAPIClient;
use App\APIClients\MascotsAPIClient;
use App\APIClients\UniformCategoriesAPIClient;
use App\APIClients\FontsAPIClient;
use App\APIClients\PreferencesAPIClient as APIClient;

class PreferencesController extends Controller
{
    protected $client;
    protected $colorsClient;
    protected $fontsClient;
    protected $uniformCategoriesClient;
    protected $mascotsClient;

    public function __construct(
        APIClient $apiClient,
        ColorsAPIClient $colorsAPIClient,
        FontsAPIClient $fontsAPIClient,
        UniformCategoriesAPIClient $uniformCategoriesAPIClient,
        MascotsAPIClient $mascotsAPIClient
    )
    {
        $this->client = $apiClient;
        $this->colorsClient = $colorsAPIClient;
        $this->fontsClient = $fontsAPIClient;
        $this->mascotsClient = $mascotsAPIClient;
        $this->uniformCategoriesClient = $uniformCategoriesAPIClient;
    }

    public function index()
    {
        $preferences = $this->client->getPreferences();
        $colors = $this->colorsClient->getColors();
        $uniform_categories = $this->uniformCategoriesClient->getUniformCategories();
        $mascots = $this->mascotsClient->getMascots();

        return view('administration.preferences.preferences', [
            'colors' => $colors,
            'preferences' => $preferences,
            'uniform_categories' => $uniform_categories,
            'mascots' => $mascots
        ]);
    }

    public function editPreferenceForm($id)
    {
        $preference = $this->client->getPreference($id);
        $colors = $this->colorsClient->getColors();
        $fonts = $this->fontsClient->getFonts();
        $uniform_categories = $this->uniformCategoriesClient->getUniformCategories();
        $mascots = $this->mascotsClient->getMascots();

        return view('administration.preferences.preference-edit', [
            'preference' => $preference,
            'fonts' => $fonts,
            'colors' => $colors,
            'uniform_categories' => $uniform_categories,
            'mascots' => $mascots
        ]);
    }

    public function addPreferenceForm()
    {
        $preferences = $this->client->getPreferences();
        $colors = $this->colorsClient->getColors();
        $fonts = $this->fontsClient->getFonts();
        $uniform_categories = $this->uniformCategoriesClient->getUniformCategories();
        $mascots = $this->mascotsClient->getMascots();

        return view('administration.preferences.preference-create', [
            'colors' => $colors,
            'fonts' => $fonts,
            'uniform_categories' => $uniform_categories,
            'mascots' => $mascots
        ]);
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        $font = $request->input('font');
        $colors_properties = $request->input('colors_properties');
        $uniform_category = $request->input('uniform_category');
        $school_name = $request->input('school_name');
        $team_name = $request->input('team_name');
        $mascot_id = $request->input('mascot');
        
        $id = null;

        if (!is_null($request->input('preference_id')))
        {
            $id = $request->input('preference_id');
        }
        // Is the Preference Name taken?
        if ($this->client->isPreferenceTaken($name, $id))
        {
            return Redirect::to('administration/preferences')
                            ->with('message', 'Preference already exist')
                            ->with('alert-class', 'danger');
        }

        $data = [
            'name' => $name,
            'font' => $font,
            'colors_properties' => $colors_properties,
            'uniform_category_id' => $uniform_category,
            'school_name' => $school_name,
            'team_name' => $team_name,
            'mascot_id' => $mascot_id,
            'id' => $id
        ];

        $data['user_id'] = Session::get('userId');
        $myJson = json_decode($colors_properties, true);

        try
        {
            // Logo File
            $logoFile = $request->file('logo');
            if (isset($logoFile))
            {
                if ($logoFile->isValid()){
                    $filename = Random::randomize(12);
                    $data['logo'] = FileUploader::upload(
                                                    $logoFile,
                                                    "preferences/{$name}"
                                                );
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/preferences')
                            ->with('message', 'There was a problem uploading your logo');
        }

        $data['colors_properties'] = json_encode($myJson, JSON_UNESCAPED_SLASHES);

        $response = null;
        if (!empty($id))
        {
            Log::info('Attempts to update Preference#' . $id);
            $data['id'] = $id;
            $response = $this->client->updatePreference($data);
        }
        else
        {
            Log::info('Attempts to create a new Preference ' . json_encode($data));
            $response = $this->client->createPreference($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/preferences')
                            ->with('message', 'Successfully saved changes')
                            ->with('alert-class', 'success');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/preferences')
                            ->with('message', $response->message);
        }
    }
}
