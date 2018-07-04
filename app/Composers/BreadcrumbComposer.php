<?php

namespace App\Composers;

use Illuminate\View\View;
use Illuminate\Http\Request;

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
            return [
                $segment => implode('/', array_slice($this->request->segments(), 0, $key + 1))
            ];
        });
    }
}