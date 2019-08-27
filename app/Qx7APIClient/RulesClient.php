<?php
namespace App\Qx7APIClient;


class RulesClient extends Qx7APIClient
{
    public function __construct()
    {
        parent::__construct();
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