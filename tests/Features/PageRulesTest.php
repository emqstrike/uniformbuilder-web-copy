<?php

use App\APIClients\DeveloperAPIClient;
use App\APIClients\PageRuleClient;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class PageRulesTest extends TestCase
{
    use WithoutMiddleware;

    protected $pageRuleClient;

    public function setUp()
    {
        parent::setUp();
        $this->pageRuleClient = new PageRuleClient();

        /*
         * Truncate test data for each tests
        */
        if (env('APP_ENV') == 'testing') {
            (new DeveloperAPIClient())->truncateTable('page_rules');
        }
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_add_page_rule()
    {
        $pages = ['page_one', 'page_two', 'page_three'];
        $data = ['type' => 'administrator', 'role' => 'ga', 'allowed_pages' => $pages, 'brand' => 'Prolook'];

        $response = $this->call('POST', route('store_new_page_rule'), $data);

        $this->visit(route('page_rules'))
             ->see($data['type'])
             ->see($data['role'])
             ->see($data['brand']);

        $response = $this->pageRuleClient->getPageRules();
        $this->assertTrue($response->success);
        foreach ($response->page_rules as $pageRule) {
            $this->assertEquals($data['type'], $pageRule->type);
            $this->assertEquals($data['role'], $pageRule->role);
            $this->assertEquals(json_encode($data['allowed_pages']), $pageRule->allowed_pages);
            $this->assertEquals($data['brand'], $pageRule->brand);
        }
    }
}
