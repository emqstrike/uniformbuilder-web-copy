<?php

namespace App\Http\Controllers\Administration;

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
        $pageRules = [];
        $result = $this->pageRuleClient->getByBrand(env('BRAND'));

        if ($result->success) {
            $pageRules = $result->page_rules;
        }

        return view('administration.page-rules.index', compact('pageRules'));
    }

    public function create()
    {
        $pages = [];

        $result = $this->pageClient->getByBrand(env('BRAND'));
        if ($result->success) {
            $pages = $result->pages;
        }

        $brands = $this->brandingClient->getAll();

        return view('administration.page-rules.create', compact('pages', 'brands'));
    }

    public function store(PageRuleRequest $request)
    {
        $data = $request->all();
        $data['allowed_pages'] = json_encode($data['allowed_pages']);

        $result = $this->pageRuleClient->create($data);
       
        if ($result->success) {
            return redirect()->route('page_rules')->with('flash_message_success', $result->message);
        }

        return redirect()->route('page_rules')->with('flash_message_error', $result->message);
    }

    public function edit($id)
    {
        $pageRule = [];
        $pages = [];

        $result = $this->pageClient->getByBrand(env('BRAND'));

        if ($result->success) {
            $pages = $result->pages;
        }

        $brands = $this->brandingClient->getAll();

        $result = $this->pageRuleClient->getPageRule($id);
        if ($result->success) {
            $pageRule = $result->page_rule;
        }

        $allowedPages = json_decode($pageRule->allowed_pages, true);
        return view('administration.page-rules.edit', compact('pageRule', 'pages', 'brands', 'allowedPages'));
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
