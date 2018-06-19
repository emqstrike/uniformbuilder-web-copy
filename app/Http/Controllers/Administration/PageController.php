<?php

namespace App\Http\Controllers\Administration;

use App\APIClients\PageClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;

class PageController extends Controller
{
    protected $pageClient;

    public function __construct(PageClient $pageClient) {
        $this->pageClient = $pageClient;
    }
    
    public function index()
    {
        $pages = $this->pageClient->getPages()->pages;

        return view('administration.pages.page', compact('pages'));
    }

    public function store(Request $request)
    {
        $this->pageClient->create($request->all());
    }

    public function update(Request $request)
    {
        $page = $this->pageClient->update($request->all());

        if ($page) {
            return redirect()->route('pages');
        }
    }

    public function edit($id)
    {
        $page = $this->pageClient->getPage($id)->page;
        return view('administration.pages.edit', compact('page'));
    }

    public function delete($id)
    {
        $result = $this->pageClient->deletePage($id);
        return redirect()->route('pages')->with('message', $result->message);
    }
}
