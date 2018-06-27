<?php

use App\APIClients\DeveloperAPIClient;
use App\APIClients\MenuClient;
use App\APIClients\PageRuleClient;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class MenuTest extends TestCase
{
    use WithoutMiddleware;

    protected $pageRuleClient;

    public function setUp()
    {
        parent::setUp();
        $this->pageRuleClient = new PageRuleClient();
        $this->menuClient = new MenuClient();

        /*
         * Truncate test data for each tests
        */
        if (env('APP_ENV') == 'testing') {
            (new DeveloperAPIClient())->truncateTable('page_rules');
            (new DeveloperAPIClient())->truncateTable('menus');
        }
    }
    
    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_ca_add_menu()
    {
        $data = [
            'route_name' => 'this_is_a_route_name', 
            'menu_text' => 'this is a menu text', 
            'icon_class' => 'this_is_icon_class',
            'remarks' => 'this is a note',
            'parent_id' => 0,
            'brand' => env('BRAND')
        ];

        $response = $this->call("POST", route('store_new_menu'), $data);

        $this->visit(route('menus'))
             ->see($data['route_name'])
             ->see($data['menu_text'])
             ->see($data['icon_class'])
             ->see($data['remarks'])
             ->see($data['parent_id'])
             ->see($data['brand']);
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_get_menu_by_brand()
    {
        for ($counter = 1; $counter <= 10; $counter++) {
            $data = [
                'route_name' => "route_$counter", 
                'menu_text' => "menu text $counter", 
                'icon_class' => "icon_class_$counter",
                'remarks' => 'this is a note',
                'parent_id' => 0,
                'brand' => env('BRAND')
            ];

            $this->call('POST', route('store_new_menu'), $data);
        }

        $response = $this->call('GET', route('menus'));

        for ($counter = 1; $counter <= 10; $counter++) {
            $this->visit(route('menus'))
                 ->see("route_$counter")
                 ->see("menu text $counter")
                 ->see("icon_class_$counter")
                 ->see("this is a note")
                 ->see(env('BRAND'));
        }
    }
}
