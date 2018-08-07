<?php

namespace App\Http\Controllers\AdministrationV2;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\APIClients\MaterialsAPIClient;
use App\APIClients\MaterialsOptionsAPIClient as APIClient;

class MaterialsOptionsController extends Controller
{
    protected $client;
    protected $materialClient;

    public function __construct(
        APIClient $apiClient,
        MaterialsAPIClient $materialClient
    )
    {
        $this->client = $apiClient;
        $this->materialClient = $materialClient;
    }

    public function updateMaterialOptions(Request $request)
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
        // dd($data);
        $response = null;

        $response = $this->client->updateMaterialOptions($data);

        return back()->with('message', 'Update Saved');

    }
}
