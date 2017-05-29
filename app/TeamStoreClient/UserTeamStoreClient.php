<?php 

namespace App\TeamStoreClient;

use App\TeamStoreClient\TeamStoreAPIClient;
use Illuminate\Http\Request;

class UserTeamStoreClient extends TeamStoreAPIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function createStore(Request $request)
    {
        $data = $request->all();

        $teamLogo = $request->file('team_logo');
        $mascot   = $request->file('mascot');

        $data['logo_url']   = $this->uploadTeamLogo($teamLogo);
        $data['mascot_url'] = $this->uploadMascot($mascot);

        $response = $this->post("team-store-user/create", [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function hasTeamStoreAccount($userID)
    {
        $response = $this->get("team-store-user/{$userID}");

        return $this->decoder->decode($response->getBody());
    }

    private function uploadTeamLogo($teamLogo)
    {
        $teamLogoInfo = [];

        if ($teamLogo) {
            $teamLogoInfo[] = [
                'name'    => 'file',
                'contents' => fopen('/tmp' . '/' . $teamLogo->getFileName(), 'r'),
                'filename' => $teamLogo->getClientOriginalName() . '.' . $teamLogo->getClientOriginalExtension()
            ];
        } else {
            return null;
        }

        $teamLogoResponse = $this->post('uploads/logo', [
            'multipart' => $teamLogoInfo
        ]);

        $teamLogoResponse = $this->decoder->decode($teamLogoResponse->getBody());

        if ($teamLogoResponse->success) {
            return $teamLogoResponse->path;
        }

        return null;
    }

    private function uploadMascot($mascot)
    {
        $mascotInfo   = [];

        if ($mascot) {
            $mascotInfo[] = [
                'name'     => 'file',
                'contents' => fopen('/tmp' . '/' . $mascot->getFileName(), 'r'),
                'filename' => $mascot->getClientOriginalName() . '.' . $mascot->getClientOriginalExtension()
            ];
        } else {
            return null;
        }

        $mascotResponse = $this->post('uploads/mascot', [
            'multipart' => $mascotInfo
        ]);

        $mascotResponse = $this->decoder->decode($mascotResponse->getBody());

        if ($mascotResponse->success) {
            return $mascotResponse->path;
        }

        return null;
    }
}