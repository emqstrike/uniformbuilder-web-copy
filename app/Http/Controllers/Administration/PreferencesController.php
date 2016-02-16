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
use App\APIClients\FontsAPIClient;
use App\APIClients\PreferencesAPIClient as APIClient;

class PreferencesController extends Controller
{
    protected $client;
    protected $colorsClient;
    protected $fontsClient;

    public function __construct(
        APIClient $apiClient,
        ColorsAPIClient $colorsAPIClient,
        FontsAPIClient $fontsAPIClient
    )
    {
        $this->client = $apiClient;
        $this->colorsClient = $colorsAPIClient;
        $this->fontsClient = $fontsAPIClient;
    }

    public function index()
    {
        $preferences = $this->client->getPreferences();
        $colors = $this->colorsClient->getColors();

        return view('administration.preferences.preferences', [
            'colors' => $colors,
            'preferences' => $preferences
        ]);
    }

    public function editPreferenceForm($id)
    {//dd($id);
        $colors = $this->colorsClient->getColors();
        $preference = $this->client->getPreference($id);
        $fonts = $this->fontsClient->getFonts();
// dd($preference);
        return view('administration.preferences.preference-edit', [
            'preference' => $preference,
            'fonts' => $fonts,
            'colors' => $colors,
        ]);
    }

    public function addPreferenceForm()
    {
        $colors = $this->colorsClient->getColors();
        $fonts = $this->fontsClient->getFonts();
        return view('administration.preferences.preference-create', [
            'colors' => $colors,
            'fonts' => $fonts
        ]);
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        $font = $request->input('font');
        $colors_properties = $request->input('colors_properties');
        
        $id = null;

        if (!is_null($request->input('preference_id')))
        {
            $id = $request->input('preference_id');
        }
        // Is the Category Name taken?
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
// dd($data);
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
