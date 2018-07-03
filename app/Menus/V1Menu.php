<?php 

namespace App\Menus;

use App\APIClients\MenuClient;
use App\APIClients\PageRuleClient;
use App\APIClients\UsersAPIClient;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

class V1Menu
{
    protected $menuClient;
    protected $pageRuleClient;
    protected $userClient;
    protected $allowedPages;

    public function __construct()
    {
        $this->menuClient = new MenuClient();
        $this->pageRuleClient = new PageRuleClient();
    }

    public function getMenu()
    {
        $menus = [];
        $rule = null;

        $type = Session::get('userType');
        $role = Session::get('role');
        $userAllowedPages = json_decode(Session::get('userAllowedPages'), true);

        $result = $this->menuClient->getMenusByBrand(env('BRAND'));

        if ($result->success) {
            $menus = $result->menus;
        }

        $result = $this->pageRuleClient->getByBrand(env('BRAND'));
        if ($result->success) {
            foreach($result->page_rules as $pageRule) {
                if (($type == $pageRule->type) && ($role == $pageRule->role)) {
                    $this->allowedPages = json_decode($pageRule->allowed_pages, true);
                }
            }
        }

        $superUsers = explode(",", env('BACKEND_SUPERUSERS'));

        if (in_array(Session::get('userId'), $superUsers)) {
            return $this->getSuperUserV1Menus($menus);
        }

        if ($menus && $this->allowedPages) {
            if (! empty($userAllowedPages)) {
                $this->allowedPages = array_merge($this->allowedPages, $userAllowedPages);
            }

            $menus = $this->getV1Menus($menus);
            return $this->excludeParentMenusWithoutSubMenu($menus);
        }

        return null;
    }

    private function getSuperUserV1Menus($menus)
    {
        $_menus = [];

        foreach ($menus as $key => $menu) {
            if (Route::getRoutes()->hasNamedRoute($menu->route_name)) {
                if (strpos(route($menu->route_name), 'v1-0')) {
                    $_menus[$key] = [
                        'route_name' => preg_replace('/\s+/', '_', $menu->route_name),
                        'menu_text' => $menu->menu_text,
                        'icon_class' => $menu->icon_class,
                        'parent_id' => $menu->parent_id,
                    ];
                }
            } elseif ($menu->route_name == '#') {
                $_menus[$key] = [
                    'route_name' => preg_replace('/\s+/', '_', $menu->route_name),
                    'menu_text' => $menu->menu_text,
                    'icon_class' => $menu->icon_class,
                    'parent_id' => $menu->parent_id,
                ];
            }

            if (isset($menu->subMenu)) {
                if (count($menu->subMenu) > 0) {
                    $_menus[$key]['subMenu'] = $this->getSuperUserV1Menus($menu->subMenu);
                }
            }
        }

        return $_menus;
    }

    private function getV1Menus($menus)
    {
        $_menus = [];

        foreach ($menus as $key => $menu) {
            if (Route::getRoutes()->hasNamedRoute($menu->route_name)) {
                if (strpos(route($menu->route_name), 'v1-0')) {
                    if (in_array($menu->route_name, $this->allowedPages)) {
                        $_menus[$key] = [
                            'route_name' => preg_replace('/\s+/', '_', $menu->route_name),
                            'menu_text' => $menu->menu_text,
                            'icon_class' => $menu->icon_class,
                            'parent_id' => $menu->parent_id,
                        ];
                    } 
                }
            } elseif ($menu->route_name == '#') {
                $_menus[$key] = [
                    'route_name' => preg_replace('/\s+/', '_', $menu->route_name),
                    'menu_text' => $menu->menu_text,
                    'icon_class' => $menu->icon_class,
                    'parent_id' => $menu->parent_id,
                ];
            }

            if (isset($menu->subMenu)) {
                if (count($menu->subMenu) > 0) {
                    $_menus[$key]['subMenu'] = $this->getV1Menus($menu->subMenu);
                }
            }
        }
        return $_menus;
    }

    private function excludeParentMenusWithoutSubMenu($menus)
    {
        $_menus = [];

        foreach ($menus as $key => $menu) {
            if (((isset($menu['subMenu'])) && (count($menu['subMenu']) > 0)) || ($menu['route_name'] != '#')) {
                $_menus[] = $menu;
            }
        }
        return $_menus;
    }
}