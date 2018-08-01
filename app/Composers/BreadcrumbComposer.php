<?php

namespace App\Composers;

use App\Utilities\URLChecker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;

class BreadcrumbComposer
{
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function compose(View $view)
    {
        $view->with('breadcrumbs', $this->parseSegments());
    }

    protected function parseSegments()
    {
        return collect($this->request->segments())->map(function ($segment, $key) {
            $uri = implode('/', array_slice($this->request->segments(), 0, $key + 1));
            $url =  env('APP_URL') . "/" . $uri;

            if(! URLChecker::is404($url)) {
                return [
                    $segment => $uri
                ];
            }
        });
    }
}