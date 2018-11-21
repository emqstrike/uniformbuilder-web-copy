<?php

namespace App\Http\Controllers\AdministrationV2;

use App\APIClients\BrandingsAPIClient;
use App\APIClients\PageClient;
use App\APIClients\PageRuleClient;
use App\APIClients\RoleClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\PageRuleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class PageRuleController extends Controller
{
protected $pageRuleClient;
    protected $roleClient;
    protected $brandingClient;
    protected $pageClient;

    public function __construct(
        PageRuleClient $pageRuleClient, 
        RoleClient $roleClient,
        PageClient $pageClient,
        BrandingsAPIClient $brandingClient
    ) {
        $this->pageRuleClient = $pageRuleClient;
        $this->roleClient = $roleClient;
        $this->pageClient = $pageClient;
        $this->brandingClient = $brandingClient;
    }

    public function index()
    {
        $pages = [];
        $pageRules = [];
        $usedAdminRoles = [];
        $usedNormalRoles = [];

        $result = $this->pageClient->getByBrand(env('BRAND'));

        if ($result->success) {
            $pages = $result->pages;
        }

        $result = $this->pageRuleClient->getByBrand(env('BRAND'));

        if ($result->success) {
            $pageRules = $result->page_rules;

            if ($this->roleClient->getRoles()->success) {
                $roles = array_map(function($role) {
                    return $role->code;
                }, $this->roleClient->getRoles()->roles);

                foreach ($pageRules as $pageRule) {
                    if ($pageRule->type == 'normal') {
                        $usedNormalRoles[] = $pageRule->role;
                    } elseif ($pageRule->type == 'administrator') {
                        $usedAdminRoles[] = $pageRule->role;
                    }
                }

                $availableNormalRoles = array_diff($roles, $usedNormalRoles);
                $availableAdminRoles = array_diff($roles, $usedAdminRoles);
            }
        }

        return view('administration-lte-2.page-rules.index', compact(
            'pageRules',
            'availableNormalRoles',
            'availableAdminRoles',
            'pages'
        ));
    }

    public function update(PageRuleRequest $request)
    {
        $data = $request->all();
        $data['allowed_pages'] = json_encode($data['allowed_pages']);

        $result = $this->pageRuleClient->update($data);

        if ($result->success) {
            return redirect()->route('page_rules')->with('flash_message_success', $result->message);
        }

        return back()->with('flash_message_error', $result->message);
    }

    public function delete($id)
    {
        $result = $this->pageRuleClient->delete($id);

        if ($result->success) {
            return redirect()->route('page_rules')->with('flash_message_success', $result->message);
        }

        return back()->with('flash_message_error', $result->message);
    }

    public function getPageRuleByTypeAndRole($type, $role)
    {
        $result = $this->pageRuleClient->getByBrand(env('BRAND'));

        if ($result->success) {
            foreach ($result->page_rules as $page_rule) {
                if (($type == $page_rule->type) && ($role == $page_rule->role)) {
                    return response()->json($page_rule);
                }
            }
        }

        return null;
    }
}
