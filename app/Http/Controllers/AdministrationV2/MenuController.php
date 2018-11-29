<?php

namespace App\Http\Controllers\AdministrationV2;

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
        $pages = [];

        $result = $this->menuClient->getMenusByBrand(env('BRAND'));
        if ($result->success) {
            $menus = $result->menus;
        }

        $result = $this->pageClient->getByBrand(env('BRAND'));

        if ($result->success) {
            $pages = $result->pages;
        }

        return view('administration-lte-2.menus.index', compact(
            'menus',
            'pages'
        ));
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $menus = array();
        
        for ($index = 0; $index < count($data['id']); $index++) {
            $menus[] = array(
                'id' => $data['id'][$index],
                'route_name' => $data['route_name'][$index],
                'menu_text' => $data['menu_text'][$index],
                'icon_class' => $data['icon_class'][$index],
                'parent_id' => $data['parent_id'][$index],
                'type' => $data['type'][$index],
                'order_id' => $data['order_id'][$index]
            );
        }

        $result = $this->menuClient->create($menus);

        if ($result->success) {
            return redirect()->route('v1_menus')->with('flash_message_success', $result->message);
        }

        return back()->with('flash_message_error', $result->message);
    }
}
