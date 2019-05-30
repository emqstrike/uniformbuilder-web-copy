<?php

namespace App\Http\Controllers\AdministrationV2;

use App\APIClients\BrandingsAPIClient;
use App\APIClients\PageClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PageController extends Controller
{
    protected $pageClient;

    public function __construct(PageClient $pageClient) {
        $this->pageClient = $pageClient;
    }
    
    public function index()
    {
        return view('administration-lte-2.pages.index');
    }
}
