<?php

namespace App\Http\Controllers\Administration;

use App\APIClients\BrandingsAPIClient;
use App\APIClients\PageClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PageController extends Controller
{
    protected $pageClient;
    protected $brandingClient;

    public function __construct(PageClient $pageClient, BrandingsAPIClient $brandingClient) {
        $this->pageClient = $pageClient;
        $this->brandingClient = $brandingClient;
    }
    
    public function index()
    {
        $pages = [];
        $result = $this->pageClient->getByBrand(env('BRAND'));

        if ($result->success) {
            $pages = $result->pages;
        }

        return view('administration.pages.page', compact('pages'));
    }

    public function store(Request $request)
    {
        $result = $this->pageClient->create($request->all());

        if ($result->success) {
            return redirect()->route('pages')->with('flash_message_success', $result->message);
        }

        return back()->with('flash_message_error', $result->message);
    }

    public function create()
    {
        return view('administration.pages.create');
    }

    public function update(Request $request)
    {
        $result = $this->pageClient->update($request->all());

        if ($result->success) {
            return redirect()->route('pages')->with('flash_message_success', $result->message);
        }

        return back()->with('flash_message_error', $result->message);
    }

    public function edit($id)
    {
        $page = [];
        $result = $this->pageClient->getPage($id);

        $brandings = $this->brandingClient->getAll();

        if ($result->success) {
            $page = $result->page;
        }

        return view('administration.pages.edit', compact('page', 'brandings'));
    }

    public function delete($id)
    {
        $result = $this->pageClient->deletePage($id);

        if ($result->success) {
            return redirect()->route('pages')->with('flash_message_success', $result->message);
        }

        return redirect()->route('pages')->with('flash_message_error', $result->message);
    }

    public function getV1Pages()
    {
        $result = $this->pageClient->getByBrand(env('BRAND'));
        $pages = [];

        if ($result->success) {
            foreach ($result->pages as $page) {
                if (strpos(route($page->code), 'v1-0')) {
                    $pages[] = $page;
                }
            }
        }

        return $pages;
    }
}
