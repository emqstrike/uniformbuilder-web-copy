<?php

namespace App\Http\Controllers\Administration;

use App\APIClients\MenuClient;
use App\APIClients\PageClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MenuController extends Controller
{
    protected $menuClient;
    protected $pageClient;

    public function __construct(MenuClient $menuClient, PageClient $pageClient)
    {
        $this->menuClient = $menuClient;
        $this->pageClient = $pageClient;
    }

    public function index()
    {
        $menus = [];

        if ($this->menuClient->getMenusByBrand(env('BRAND'))->success) {
            $menus = $this->menuClient->getMenusByBrand(env('BRAND'))->menus;
        }

        return view('administration.menus.index', compact('menus'));
    }

    public function store(Request $request)
    {
        $result = $this->menuClient->create($request->all());

        if ($result->success) {
            return redirect()->route('menus')->with('flash_message_success', $result->message);
        }

        return back()->with('flash_message_error', $result->message);
    }

    public function edit($id)
    {
        $currentMenu = [];
        $menus = [];

        if ($this->menuClient->getById($id)->success) {
            $currentMenu = $this->menuClient->getById($id)->menu;
        }

        if ($this->menuClient->getAllMenus()->success) {
            $menus = $this->menuClient->getAllMenus()->menus;
        }

        return view('administration.menus.edit', compact('currentMenu', 'menus'));
    }

    public function create()
    {
        $menus = [];
        $pages = [];

        if ($this->menuClient->getMenusByBrand(env('BRAND'))->success) {
            $menus = $this->menuClient->getMenusByBrand(env('BRAND'))->menus;
        }

        if ($this->pageClient->getByBrand(env('BRAND'))->success) {
            $pages = $this->pageClient->getByBrand(env('BRAND'))->pages;
        }

        return view('administration.menus.create', compact('menus', 'pages'));
    }

    public function update(Request $request)
    {
        $result = $this->menuClient->update($request->all());

        if ($result->success) {
            return redirect()->route('menus')->with('flash_message_success', $result->message);
        }

        return back()->with('flash_message_error', $result->message);
    }

    public function delete($id)
    {
        $result = $this->menuClient->delete($id);

        if ($result->success) {
            return redirect()->route('menus')->with('flash_message_success', $result->message);
        }

        return redirect()->route('menus')->with('flash_message_error', $result->message);
    }
}
