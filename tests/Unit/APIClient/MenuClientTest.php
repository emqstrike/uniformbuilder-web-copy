<?php

use App\APIClients\DeveloperAPIClient;
use App\APIClients\MenuClient;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class MenuClientTest extends TestCase
{
    use WithoutMiddleware;

    protected $menuClient;

    public function setUp()
    {
        parent::setUp();
        $this->menuClient = new MenuClient();

        /*
         * Truncate test data for each tests
        */
        if (env('APP_ENV') == 'testing') {
            (new DeveloperAPIClient())->truncateTable('menus');
        }
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_get_all_menu()
    {
        $menus = [];

        for ($counter = 1; $counter <= 10; $counter++) {
            $data = [
                'route_name' => "route_$counter", 
                'menu_text' => "menu text $counter", 
                'icon_class' => "icon_class_$counter",
                'parent_id' => 0
            ];

            $menus[] = $this->menuClient->create($data)->menu;
        }

        $response = $this->menuClient->getAllMenus();
        $this->assertTrue($response->success);
        foreach ($response->menus as $key => $menu) {
            $this->assertEquals($menus[$key]->route_name, $menu->route_name);
        }
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_add_menu()
    {
        $data = [
            'route_name' => 'this_is_a_route_name', 
            'menu_text' => 'this is a menu text', 
            'icon_class' => 'this_is_icon_class',
            'parent_id' => 0,
            'brand' => 'prolook'
        ];

        $menu = $this->menuClient->create($data)->menu;

        $this->assertEquals($data['route_name'], $menu->route_name);
        $this->assertEquals($data['menu_text'], $menu->menu_text);
        $this->assertEquals($data['icon_class'], $menu->icon_class);
        $this->assertEquals($data['parent_id'], $menu->parent_id);
        $this->assertEquals($data['brand'], $menu->brand);
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_update_menu()
    {
        $data = [
            'route_name' => 'this_is_a_route_name', 
            'menu_text' => 'this is a menu text', 
            'icon_class' => 'this_is_icon_class',
            'parent_id' => 0
        ];

        $menu = $this->menuClient->create($data)->menu;

        $data = array('id' => $menu->id, 'route_name' => 'new_route_name', 'menu_text' => 'new text menu');
        $menu = $this->menuClient->update($data)->menu;

        $this->assertEquals($data['route_name'], $menu->route_name);
        $this->assertEquals($data['menu_text'], $menu->menu_text);
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_get_menu_by_id()
    {
        $data = [
            'route_name' => 'this_is_a_route_name', 
            'menu_text' => 'this is a menu text', 
            'icon_class' => 'this_is_icon_class',
            'parent_id' => 0
        ];

        $menu = $this->menuClient->create($data)->menu;

        $menu = $this->menuClient->getById($menu->id)->menu;
        $this->assertEquals($data['route_name'], $menu->route_name);
        $this->assertEquals($data['menu_text'], $menu->menu_text);
        $this->assertEquals($data['icon_class'], $menu->icon_class);
        $this->assertEquals($data['parent_id'], $menu->parent_id);
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_delete_menu()
    {
        $data = [
            'route_name' => 'this_is_a_route_name', 
            'menu_text' => 'this is a menu text', 
            'icon_class' => 'this_is_icon_class',
            'parent_id' => 0
        ];

        $menu = $this->menuClient->create($data)->menu;

        $response = $this->menuClient->delete($menu->id);
        $this->assertTrue($response->success);
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_get_menus_by_brand()
    {
        $parentMenu = [
            'route_name' => 'this_is_a_route_name', 
            'menu_text' => 'this is a menu text', 
            'icon_class' => 'this_is_icon_class',
            'parent_id' => 0,
            'brand' => 'prolook'
        ];
        $parentMenu = $this->menuClient->create($parentMenu)->menu;

        $subMenu = [
            'route_name' => 'this_is_a_route_name', 
            'menu_text' => 'this is a menu text', 
            'icon_class' => 'this_is_icon_class',
            'parent_id' => $parentMenu->id,
            'brand' => $parentMenu->brand,
        ];
        $subMenu = $this->menuClient->create($subMenu)->menu;

        $menus = $this->menuClient->getMenusByBrand($parentMenu->brand)->menus;
        $this->assertEquals($parentMenu->id, $menus[0]->id);
        $this->assertEquals($parentMenu->brand, $menus[0]->brand);

        foreach ($menus[0]->subMenu as  $menu) {
            $this->assertEquals($subMenu->id, $menu->id);
            $this->assertEquals($parentMenu->brand, $menu->brand);
        }
    }
}
