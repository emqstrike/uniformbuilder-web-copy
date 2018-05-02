<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\ColorsAPIClient as APIClient;

class ColorsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    /**
     * Colors
     */
    public function index()
    {
        $colors = $this->client->getColors();

        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);

        if (in_array($user_id, $su_array)) {
            return view('administration-lte-2.colors.colors', [
            'colors' => $colors
            ]);
        }
        else {
                return redirect('administration');
        }
    }

    public function updateColors(Request $request)
    {
        $data = [
            'content' => "TEST"
        ];

        Log::info('Attempts to update all colors' . json_encode($data));
        $response = $this->client->updateAllColors($data);

        return Redirect::to('administration/colors')
                        ->with('message', 'Colors have been updated');
    }

    public function addColorForm()
    {
        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);

        if (in_array($user_id, $su_array)) {
            return view('administration.colors.color-create');
        }
        else {
                return redirect('administration');
        }
    }

    public function editColorForm($id)
    {
        $color = $this->client->getColor($id);
        return view('administration.colors.color-edit', [
            'color' => $color
        ]);
    }

    public function store(Request $request)
    {
        $colorName = $request->input('name');
        $colorCode = $request->input('color_code');
        $hexCode = $request->input('hex_code');
        $sublimationOnly = $request->input('sublimation_only');

        $colorId = null;
        if (!empty($request->input('color_id')))
        {
            $colorId = $request->input('color_id');
        }

        if (strpos($hexCode, '#') > -1)
        {
            $hexCode = str_replace('#', '', $hexCode);
        }

        // Color Name should be Unique
        if ($this->client->isColorExist($colorName, $colorId))
        {
            return Redirect::to('administration/colors')
                        ->with('message', 'Color name already exists');
        }

        // Color Code should be Unique
        if ($this->client->isColorCodeExist($colorCode, $colorId))
        {
            return Redirect::to('administration/colors')
                        ->with('message', 'Color Code already exists');
        }

        $data = [
            'name' => $colorName,
            'color_code' => $colorCode,
            'hex_code' => $hexCode,
            'sublimation_only' => $sublimationOnly
        ];

        $response = null;
        if (!empty($colorId))
        {
            Log::info('Attempts to update Color#' . $colorId);
            $data['id'] = $colorId;
            $response = $this->client->updateColor($data);
        }
        else
        {
            Log::info('Attempts to create a new Color ' . json_encode($data));
            $response = $this->client->createColor($data);
        }


        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/colors')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/colors')
                            ->with('message', 'There was a problem saving your color');
        }
    }
}
