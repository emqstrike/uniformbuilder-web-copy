<?php

namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\APIClient;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Utilities\HTTPBodyReader;
use App\Http\Controllers\Controller;
use App\Common\ColorDAO;

class ColorsController extends Controller
{
    protected $client;

    public function __construct($accessToken = null)
    {
        $settings = [
            'base_uri' => 'http://' . getenv('API_HOST') . '/api/',
        ];
        if (!is_null($accessToken))
        {
            $settings['headers'] = [
                'accessToken' => $accessToken
            ];
        }
        $this->client = new APIClient($settings);
    }

    /**
     * Colors
     */
    public function index()
    {
        $colors = $this->client->getColors();

        return view('administration/colors', [
            'colors' => $colors,
            'api_host' => env('API_HOST')
        ]);
    }

    public function addColorForm()
    {
        return view('administration/color-create');
    }

    public function editColorForm($id)
    {
        $color = $this->client->getColor($id);
        return view('administration/color-edit', [
            'color' => $color
        ]);
    }

    public function store(Request $request)
    {
        $colorName = $request->input('name');
        $colorCode = $request->input('color_code');
        $hexCode = $request->input('hex_code');

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
            'hex_code' => $hexCode
        ];

        $response = null;
        if (!empty($colorId))
        {
            $data['id'] = $colorId;
            $response = $this->client->updateColor($data);
        }
        else
        {
            $response = $this->client->createColor($data);
        }


        if ($response->success)
        {
            return Redirect::to('administration/colors')
                            ->with('message', $response->message);
        }
        else
        {
            return Redirect::to('administration/colors')
                            ->with('message', 'There was a problem saving your color');
        }
    }
}
