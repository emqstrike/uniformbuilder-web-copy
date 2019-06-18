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

    const HEADER_TYPE = 'header';
    const LINK_TYPE = 'link';

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
                if (($type == strtolower($pageRule->type)) && ($role == $pageRule->role)) {
                    $this->allowedPages = json_decode($pageRule->allowed_pages, true);
                }
            }
        }

        if ($menus) {
            if ($this->allowedPages && $userAllowedPages) {
                $this->allowedPages = array_merge($this->allowedPages, $userAllowedPages);
            } elseif ($userAllowedPages) {
                $this->allowedPages = $userAllowedPages;
            }

            $menus = $this->getV1Menus($menus);
            $menus = $this->excludeParentMenusWithoutSubMenu($menus);
            return $menus;
        }

        return null;
    }

    private function getV1Menus($menus)
    {
        $_menus = [];

        if ($this->allowedPages) {
            foreach ($menus as $key => $menu) {
                $routeName = preg_replace('/\s+/', '', $menu->route_name);

                if ($menu->type == self::HEADER_TYPE) {
                    $_menus[$key] = [
                        'route_name' => $routeName,
                        'menu_text' => $menu->menu_text,
                        'icon_class' => $menu->icon_class,
                        'parent_id' => $menu->parent_id,
                        'type' => $menu->type,
                    ];
                }

                if (Route::getRoutes()->hasNamedRoute($routeName)) {
                    if (strpos(route($routeName), 'v1-0')) {
                        if (in_array($routeName, $this->allowedPages)) {
                            $_menus[$key] = [
                                'route_name' => $routeName,
                                'menu_text' => $menu->menu_text,
                                'icon_class' => $menu->icon_class,
                                'parent_id' => $menu->parent_id,
                                'type' => $menu->type,
                            ];

                            if (isset($menu->menus)) {
                                if (count($menu->menus) > 0) {
                                    $_menus[$key]['menus'] = $this->getV1Menus($menu->menus);
                                }
                            }
                        }
                    }
                }  elseif ($routeName == '#') {
                    $_menus[$key] = [
                        'route_name' => $routeName,
                        'menu_text' => $menu->menu_text,
                        'icon_class' => $menu->icon_class,
                        'parent_id' => $menu->parent_id,
                        'type' => $menu->type,
                    ];

                    if (isset($menu->menus)) {
                        if ( count( (array) $menu->menus) > 0) {
                            $_menus[$key]['menus'] = $this->getV1Menus($menu->menus);
                        }
                    }
                }
            }
        }

        return $_menus;
    }

    private function excludeParentMenusWithoutSubMenu($menus)
    {
        $_menus = [];

        foreach ($menus as $key => $menu) {
            if (((isset($menu['menus'])) && (count($menu['menus']) > 0)) || ($menu['route_name'] != '#') || ($menu['type'] == self::HEADER_TYPE)) {
                $_menus[] = $menu;
            }
        }
        return $_menus;
    }
}
