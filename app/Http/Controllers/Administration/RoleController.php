<?php

namespace App\Http\Controllers\Administration;

use App\APIClients\PageRuleClient;
use App\APIClients\RoleClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RoleController extends Controller
{
    protected $pageRuleClient;
    protected $roleClient;

    public function __construct(PageRuleClient $pageRuleClient, RoleClient $roleClient)
    {
        $this->pageRuleClient = $pageRuleClient;
        $this->roleClient = $roleClient;
    }

    public function getAvailableAdminRolesForPageRules()
    {
        $usedAdminRoles = [];
        $availableAdminRoles = [];

        if ($this->pageRuleClient->getByBrand(env('BRAND'))->success) {
            $pageRules = $this->pageRuleClient->getByBrand(env('BRAND'))->page_rules;

            foreach ($pageRules as $pageRule) {
                if ($pageRule->type == 'administrator') {
                    $usedAdminRoles[] = $pageRule->role;
                }
            }
        }
        if ($this->roleClient->getRoles()->success) {
            $roles = $this->roleClient->getRoles()->roles;

            foreach ($roles as $role) {
                if (! in_array($role->code, $usedAdminRoles)) {
                    $availableAdminRoles[] = $role;
                }
            }
        }

        Log::info(print_r($availableAdminRoles, true));

        return $availableAdminRoles;
    }

    public function getAvailableNormalRolesForPageRules()
    {
        $usedNormalRoles = [];
        $availableNormalRoles = [];

        if ($this->pageRuleClient->getByBrand(env('BRAND'))->success) {
            $pageRules = $this->pageRuleClient->getByBrand(env('BRAND'))->page_rules;

            foreach ($pageRules as $pageRule) {
                if ($pageRule->type == 'normal') {
                    $usedNormalRoles[] = $pageRule->role;
                }
            }
        }

        if ($this->roleClient->getRoles()->success) {
            $roles = $this->roleClient->getRoles()->roles;

            foreach ($roles as $role) {
                if (! in_array($role->code, $usedNormalRoles)) {
                    $availableNormalRoles[] = $role;
                }
            }
        }

        return $availableNormalRoles;
    }
}
