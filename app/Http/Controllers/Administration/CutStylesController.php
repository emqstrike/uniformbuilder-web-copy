<?php

namespace Customizer\Http\Controllers\Administration;

use \Session;
use \Redirect;
use Customizer\Http\Requests;
use Customizer\Utilities\Log;
use Illuminate\Http\Request;
use Customizer\Http\Controllers\Controller;
use Customizer\APIClients\CutStylesAPIClient as APIClient;

class CutStylesController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function neckStyles()
    {
        $necks = $this->client->getNeckStyles();

        return view('administration.cuts.cuts', [
            'cuts' => $necks,
            'title' => 'Neck Styles',
            'cut_type' => 'Neck Style',
            'create_endpoint' => 'neck-styles'
        ]);
    }

    public function sleeveStyles()
    {
        $sleeves = $this->client->getSleeveStyles();

        return view('administration.cuts.cuts', [
            'cuts' => $sleeves,
            'title' => 'Sleeve Styles',
            'create_endpoint' => 'sleeve-styles'
        ]);
    }

    public function pantCuts()
    {
        $pants = $this->client->getPantCuts();

        return view('administration.cuts.cuts', [
            'cuts' => $pants,
            'title' => 'Pant Cuts',
            'create_endpoint' => 'pant-cuts'
        ]);
    }

    public function waistCuts()
    {
        $waists = $this->client->getWaistCuts();

        return view('administration.cuts.cuts', [
            'cuts' => $waists,
            'title' => 'Waist Cuts',
            'create_endpoint' => 'waist-cuts'
        ]);
    }

    public function sleevePanels()
    {
        $sleeves = $this->client->getSleevePanels();

        return view('administration.cuts.cuts', [
            'cuts' => $sleeves,
            'title' => 'Sleeve Panels',
            'create_endpoint' => 'sleeve-panels'
        ]);
    }

    public function shoulderPanels()
    {
        $shoulders = $this->client->getShoulderPanels();

        return view('administration.cuts.cuts', [
            'cuts' => $shoulders,
            'title' => 'Shoulder Panels',
            'create_endpoint' => 'shoulder-panels'
        ]);
    }

    public function underarmPanels()
    {
        $underarms = $this->client->getUnderarmPanels();

        return view('administration.cuts.cuts', [
            'cuts' => $underarms,
            'title' => 'Underarm Panels',
            'create_endpoint' => 'underarm-panels'
        ]);
    }

    public function addForm($type)
    {
        $cutType = null;
        switch ($type) {
            case 'pant-cuts': $cutType = 'pant cut'; break;
            case 'waist-cuts': $cutType = 'waist cut'; break;
            case 'sleeve-styles': $cutType = 'sleeve style'; break;
            case 'neck-styles': $cutType = 'neck style'; break;
            case 'sleeve-panels': $cutType = 'sleeve panel'; break;
            case 'shoulder-panels': $cutType = 'shoulder panel'; break;
            case 'underarm-panels': $cutType = 'underarm panel'; break;
        }
        return view('administration.cuts.cut-create',[
            'type' => $type,
            'cut_type' => $cutType
        ]);
    }

    public function editForm($id)
    {
        $style = $this->client->getCutStyle($id);

        $button = null;
        switch ($style->cut_type) {
            case 'pant cut': $button = 'pant cut'; $return = 'pant-cuts'; break;
            case 'waist cut': $button = 'waist cut'; $return = 'waist-cuts'; break;
            case 'sleeve style': $button = 'sleeve style'; $return = 'sleeve-styles'; break;
            case 'neck style': $button = 'neck style'; $return = 'neck-styles'; break;
            case 'sleeve panel': $button = 'sleeve panel'; $return = 'sleeve-panels'; break;
            case 'shoulder panel': $button = 'shoulder panel'; $return = 'shoulder-panels'; break;
            case 'underarm panel': $button = 'underarm panel'; $return = 'underarm-panels'; break;
        }

        return view('administration.cuts.cut-edit', [
            'style' => $style,
            'button_text' => $button,
            'return_endpoint' => $return
        ]);
    }

    public function store(Request $request)
    {
        $cutName = $request->input('name');
        $code = $request->input('code');
        $cutType = $request->input('cut_type');

        $return = null;
        switch ($cutType) {
            case 'pant cut': $return = 'pant-cuts'; break;
            case 'waist cut': $return = 'waist-cuts'; break;
            case 'sleeve style': $return = 'sleeve-styles'; break;
            case 'neck style': $return = 'neck-styles'; break;
            case 'sleeve panel': $return = 'sleeve-panels'; break;
            case 'shoulder panel': $return = 'shoulder-panels'; break;
            case 'underarm panel': $return = 'underarm-panels'; break;
        }

        $cutId = null;
        if (!empty($request->input('cut_id')))
        {
            $cutId = $request->input('cut_id');
        }

        // Code should be Unique
        if ($this->client->isExist($code, $cutName, $cutId, $error))
        {
            return Redirect::to('administration/cuts/' . $return)
                        ->with('message', $error);
        }

        $data = [
            'name' => $cutName,
            'code' => $code,
            'cut_type' => $cutType
        ];

        $response = null;
        if (!empty($cutId))
        {
            Log::info('Attempts to update CutStyle#' . $cutId);
            $data['id'] = $cutId;
            $response = $this->client->updateCutStyle($data);
        }
        else
        {
            Log::info('Attempts to create a new Cut Style ' . json_encode($data));
            $response = $this->client->createCutStyle($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/cuts/' . $return)
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/cuts/' . $return)
                            ->with('message', 'There was a problem saving your changes');
        }
    }
}
