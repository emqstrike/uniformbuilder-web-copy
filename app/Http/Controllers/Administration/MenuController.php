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

        $result = $this->menuClient->getMenusByBrand(env('BRAND'));
        if ($result->success) {
            $menus = $result->menus;
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

        $result = $this->menuClient->getById($id);

        if ($result->success) {
            $currentMenu = $result->menu;
        }

        $result = $this->menuClient->getAllMenus();
        if ($result->success) {
            $menus = $result->menus;
        }

        return view('administration.menus.edit', compact('currentMenu', 'menus'));
    }

    public function create()
    {
        $menus = [];
        $pages = [];

        $result = $this->menuClient->getMenusByBrand(env('BRAND'));
        if ($result->success) {
            $menus = $result->menus;
        }

        $result = $this->pageClient->getByBrand(env('BRAND'));
        if ($result->success) {
            $pages = $result->pages;
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
