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
        $cutName = $request->input('name');
        $code = $request->input('code');
        $cutType = $request->input('cut_type');
        $type = substr($cutType, 0, strpos($cutType, ' ')) . 's';

        $cutId = null;
        if (!empty($request->input('cut_id')))
        {
            $cutId = $request->input('cut_id');
        }

        // Code should be Unique
        if ($this->client->isExist($code, $cutId))
        {
            return Redirect::to('administration/cuts/' . $type)
                        ->with('message', 'Code already exists');
        }

        $data = [
            'name' => $cutName,
            'code' => $code,
            'cut_type' => $cutType
        ];

        $response = null;
        if (!empty($cutId))
        {
            $data['id'] = $cutId;
            $response = $this->client->updateCutStyle($data);
        }
        else
        {
            $response = $this->client->createCutStyle($data);
        }

        if ($response->success)
        {
            return Redirect::to('administration/cuts/' . $type)
                            ->with('message', $response->message);
        }
        else
        {
            return Redirect::to('administration/cuts/' . $type)
                            ->with('message', 'There was a problem saving your cut');
        }
    }
}
