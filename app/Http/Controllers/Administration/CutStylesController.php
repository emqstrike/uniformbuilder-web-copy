<?php

namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\CutStylesAPIClient as APIClient;

class CutStylesController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function necks()
    {
        $necks = $this->client->getNecks();

        return view('administration.cuts.cuts', [
            'cuts' => $necks,
            'title' => 'Necks'
        ]);
    }

    public function sleeves()
    {
        $sleeves = $this->client->getSleeves();

        return view('administration.cuts.cuts', [
            'cuts' => $sleeves,
            'title' => 'Sleeves'
        ]);
    }

    public function pants()
    {
        $pants = $this->client->getPants();

        return view('administration.cuts.cuts', [
            'cuts' => $pants,
            'title' => 'Pants'
        ]);
    }

    public function waists()
    {
        $waists = $this->client->getWaists();

        return view('administration.cuts.cuts', [
            'cuts' => $waists,
            'title' => 'Waists'
        ]);
    }

    public function addForm($type)
    {
        $cutType = null;
        switch ($type) {
            case 'pant': $cutType = 'pant cut'; break;
            case 'waist': $cutType = 'waist cut'; break;
            case 'sleeve': $cutType = 'sleeve style'; break;
            case 'neck': $cutType = 'neck style'; break;
        }
        return view('administration.cuts.cut-create',[
            'type' => $type,
            'cut_type' => $cutType
        ]);
    }

    public function editForm($id)
    {
        $style = $this->client->getCutStyle($id);
        return view('administration.cuts.cut-edit', [
            'cut_style' => $style
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
            return Redirect::to('administration/cuts')
                        ->with('message', 'Color name already exists');
        }

        // Color Code should be Unique
        if ($this->client->isColorCodeExist($colorCode, $colorId))
        {
            return Redirect::to('administration/cuts')
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
            return Redirect::to('administration/cuts')
                            ->with('message', $response->message);
        }
        else
        {
            return Redirect::to('administration/cuts')
                            ->with('message', 'There was a problem saving your color');
        }
    }
}
