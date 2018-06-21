<?php

namespace App\Http\Middleware;

use App\APIClients\PageRuleClient;
use Closure;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Session;

class RedirectRestrictedUser
{
    protected $pageRuleClient;
    protected $route;

    public function __construct(Route $route, PageRuleClient $pageRuleClient)
    {
        $this->route = $route;
        $this->pageRuleClient = $pageRuleClient;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $type = Session::get('userType');
        $role = Session::get('role');

        $result = $this->pageRuleClient->getByBrand(env('BRAND'));

        if ($result->success) {
            foreach ($result->page_rules as $pageRule) {
                if (($type == $pageRule->type) && ($role == $pageRule->role)) {
                    $allowedPages = json_decode($pageRule->allowed_pages, true);

                    if (in_array($this->route->getName(), $allowedPages)) {
                        return $next($request);
                    }
                }
            }
        }

        return back();
    }
}
