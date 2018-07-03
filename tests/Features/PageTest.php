<?php

use App\APIClients\DeveloperAPIClient;
use App\APIClients\PageClient;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class PageTest extends TestCase
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
    public function it_can_list_all_pages()
    {
        $pages = array(
            array('code' => 'page_one', 'brand' => 'prolook'),
            array('code' => 'page_two', 'brand' => 'prolook'),
            array('code' => 'page_three', 'brand' => 'prolook'),
        );
        foreach ($pages as $page) {
            $this->pageClient->create($page);
        };

        $response = $this->call('GET', route('pages'));

        $this->assertEquals(200, $response->status());
        foreach ($pages as $page) {
            $this->visit(route('pages'))
                 ->see($page['code'])
                 ->see($page['brand']);
        }
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_add_page()
    {
        $page = array('code' => 'page_one');

        $response = $this->call('POST', route('store_new_page'), $page);

        $this->visit(route('pages'))
             ->see($page['code']);
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_edit_page()
    {
        $data = array('code' => 'page_one', 'brand' => 'prolook');
        $page = $this->pageClient->create($data)->page;

        $response = $this->call('GET', route('edit_page', ['id' => $page->id]));

        $this->assertEquals(200, $response->status());
        $this->see($page->code);
        $this->see($page->brand);
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_update_page()
    {
        $data = array('code' => 'page_one');
        $page = $this->pageClient->create($data)->page;

        $exptectedResult = array('id' => $page->id, 'code' => 'page_updated');
        $this->call('PATCH', route('update_page', ['id' => $page->id]), $exptectedResult);

        $this->visit(route('pages'))
             ->see($exptectedResult['code']);
    }

    /**
     * @test
     * @runInSeparateProcess
     */
    public function it_can_remove_page()
    {
        $data = array('code' => 'page_one', 'brand' => 'prolook');
        $page = $this->pageClient->create($data)->page;
        $data = array('code' => 'page_two', 'brand' => 'prolook');
        $page = $this->pageClient->create($data)->page;

        $this->call('GET', route('delete_page', ['id' => $page->id]));

        $this->visit(route('pages'))
             ->dontSee($data['code']);
    }
}
