<?php
namespace App\Qx7APIClient;

use Illuminate\Support\Facades\Log;


class RulesClient extends Qx7APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getBodyPartColorGroups($ruleId)
    {
        $response = $this->get("rule/{$ruleId}");
        $result = $this->decoder->decode($response->getBody());

        if (isset($result->rules)) {
            return json_decode(json_decode($result->rules->body_part_color_groups, true), true);
        }

        return null;
    }

    public function getFonts($ruleId)
    {
        $response = $this->get("rule/$ruleId");
        $result = $this->decoder->decode($response->getBody());

        $fonts = [];

        if ($result->success) {
            if (isset($result->rules->fonts)) {
                $fonts = $result->rules->fonts;
            }
        }

        return $fonts;
    }
}