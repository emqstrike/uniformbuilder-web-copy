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
        (new DeveloperAPIClient())->truncateTable('pages');
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function itCanAddPage()
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
    public function itCanUpdatePage()
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
    public function itCanGetPage()
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
    public function itCanRemovePage()
    {
        $data = array('code' => 'page_one', 'brand' => 'prolook');
        $page = $this->pageClient->create($data)->page;

        $response = $this->pageClient->deletePage($page->id);

        $this->assertTrue($response->success);
    }
}
