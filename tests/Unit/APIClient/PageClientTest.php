<?php

use App\APIClients\DeveloperAPIClient;
use App\APIClients\PageClient;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Support\Facades\Log;

class PageClientTest extends TestCase
{
    use WithoutMiddleware;

    protected $pageClient;

    public function setUp()
    {
        parent::setUp();
        $this->pageClient = new PageClient();

        /*
         * Truncate test data for each tests
        */
        if (env('APP_ENV') == 'testing') {
            (new DeveloperAPIClient())->truncateTable('pages');
        }
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_add_page()
    {
        $expectedResult = array('code' => 'page_one', 'brand' => 'prolook');

        $page = $this->pageClient->create($expectedResult)->page;
        $this->assertEquals($expectedResult['code'], $page->code);
        $this->assertEquals($expectedResult['brand'], $page->brand);
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_update_page()
    {
        $data = array('code' => 'page_one', 'brand' => 'prolook');
        $page = $this->pageClient->create($data)->page;

        $expectedResult = array('id' => $page->id, 'code' => 'page_updated', 'brand' => 'richardson');
        $page = $this->pageClient->update($expectedResult)->page;

        $this->assertEquals($expectedResult['code'], $page->code);
        $this->assertEquals($expectedResult['brand'], $page->brand);
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_get_page()
    {
        $expectedResult = array('code' => 'page_one', 'brand' => 'prolook');
        $page = $this->pageClient->create($expectedResult)->page;

        $page = $this->pageClient->getPage($page->id)->page;

        $this->assertEquals($expectedResult['code'], $page->code);
        $this->assertEquals($expectedResult['brand'], $page->brand);
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_remove_page()
    {
        $data = array('code' => 'page_one', 'brand' => 'prolook');
        $page = $this->pageClient->create($data)->page;

        $response = $this->pageClient->deletePage($page->id);

        $this->assertTrue($response->success);
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_get_pages_by_brand()
    {
        $prolookData = array('code' => 'page_one', 'brand' => 'prolook');
        $prolookPage = $this->pageClient->create($prolookData)->page;

        $richardsonData = array('code' => 'page_one', 'brand' => 'richardson');
        $richardsonPage = $this->pageClient->create($richardsonData)->page;

        $response = $this->pageClient->getByBrand($prolookPage->brand);

        $this->assertTrue($response->success);
        foreach ($response->pages as $page) {
            $this->assertEquals($prolookPage->brand, $page->brand);
            $this->assertNotEquals($richardsonPage->brand, $page->brand);
        }
    }
}
