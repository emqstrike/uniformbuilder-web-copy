<?php

use App\APIClients\DeveloperAPIClient;
use App\APIClients\PageRuleClient;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class PageRuleClientTest extends TestCase
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
        $pages = json_encode(['page_one', 'page_two', 'page_three']);
        $expectedResult = ['type' => 'administrator', 'role' => 'ga', 'allowed_pages' => $pages, 'brand' => 'Prolook'];

        $pageRule = $this->pageRuleClient->create($expectedResult)->page_rule;
        $this->assertEquals($expectedResult['type'], $pageRule->type);
        $this->assertEquals($expectedResult['role'], $pageRule->role);
        $this->assertEquals($expectedResult['allowed_pages'], $pageRule->allowed_pages);
        $this->assertEquals($expectedResult['brand'], $pageRule->brand);
    }

     /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_get_all_page_rules()
    {
        $pageRules = [];
        $roles = ['ga', 'qa', 'rep', 'dev', 'rep_manager', 'dealer', 'coach', 'executive'];
        $pages = json_encode(['page_one', 'page_two', 'page_three']);
        foreach ($roles as $role) {
            $pageRule = ['type' => 'administrator', 'role' => $role, 'allowed_pages' => $pages, 'brand' => 'Prolook'];
            $pageRules[] = $this->pageRuleClient->create($pageRule)->page_rule;
        }

        $response = $this->pageRuleClient->getPageRules();

        $this->assertTrue($response->success);
        foreach ($response->page_rules as $key => $pageRule) {
            $this->assertEquals($pageRules[$key]->type, $pageRule->type);
        }
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_get_page_rule_by_brand()
    {
        $pages = json_encode(['page_one', 'page_two', 'page_three']);
        $pageRule = ['type' => 'administrator', 'role' => 'ga', 'allowed_pages' => $pages, 'brand' => 'Prolook'];
        $prolookPageRule = $this->pageRuleClient->create($pageRule)->page_rule;

        $pages = json_encode(['page_one', 'page_two', 'page_three']);
        $pageRule = ['type' => 'administrator', 'role' => 'ga', 'allowed_pages' => $pages, 'brand' => 'Richardson'];
        $richardsonPageRule = $this->pageRuleClient->create($pageRule)->page_rule;

        $response = $this->pageRuleClient->getByBrand($prolookPageRule->brand);

        $this->assertTrue($response->success);
        foreach ($response->page_rules as $pageRule) {
            $this->assertEquals($prolookPageRule->brand, $pageRule->brand);
            $this->assertNotEquals($richardsonPageRule->brand, $pageRule->brand);
        }
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_get_page_rule()
    {
        $pages = json_encode(['page_one', 'page_two', 'page_three']);
        $pageRule = ['type' => 'administrator', 'role' => 'ga', 'allowed_pages' => $pages, 'brand' => 'Prolook'];
        $pageRule = $this->pageRuleClient->create($pageRule)->page_rule;

        $response = $this->pageRuleClient->getPageRule($pageRule->id)->page_rule;

        $this->assertEquals($pageRule->type, $response->type);
        $this->assertEquals($pageRule->role, $response->role);
        $this->assertEquals($pageRule->allowed_pages, $response->allowed_pages);
        $this->assertEquals($pageRule->brand, $response->brand);
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_update_page_rule()
    {
        $pages = json_encode(['page_one', 'page_two', 'page_three']);
        $pageRule = ['type' => 'administrator', 'role' => 'ga', 'allowed_pages' => $pages, 'brand' => 'Prolook'];
        $pageRule = $this->pageRuleClient->create($pageRule)->page_rule;

        $expectedResult = array('id' => $pageRule->id, 'type' => 'normal', 'brand' => 'Richardson');
        $pageRule = $this->pageRuleClient->update($expectedResult)->page_rule;

        $this->assertEquals($expectedResult['type'], $pageRule->type);
        $this->assertEquals($expectedResult['brand'], $pageRule->brand);
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_delete_page_rule()
    {
        $pages = json_encode(['page_one', 'page_two', 'page_three']);
        $pageRule = ['type' => 'administrator', 'role' => 'ga', 'allowed_pages' => $pages, 'brand' => 'Prolook'];
        $pageRule = $this->pageRuleClient->create($pageRule)->page_rule;

        $response = $this->pageRuleClient->delete($pageRule->id);

        $this->assertTrue($response->success);
    }
}
