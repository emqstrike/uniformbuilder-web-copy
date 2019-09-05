<?php
namespace App\Qx7APIClient;


class RulesClient extends Qx7APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getBodyParts($ruleId)
    {
        $response = $this->get("rule/{$ruleId}");
        $result = $this->decoder->decode($response->getBody());

        $bodyParts = [];

        if (isset($result->rules)) {
            $bodyPartGroups = json_decode(json_decode($result->rules->body_part_color_groups, true), true);

            foreach ($bodyPartGroups as $bodyPartGroup) {
                foreach ($bodyPartGroup['Body Parts'] as $part) {
                    array_push($bodyParts, $part);
                }
            }

            return $bodyParts;
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