<?php

namespace App\Http\Middleware;

use App\APIClients\PageRuleClient;
use Closure;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Log;
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
        /*$superUsers = explode(",", env('BACKEND_SUPERUSERS'));

        if (in_array(Session::get('userId'), $superUsers)) {
            return $next($request);
        }*/

        $type = Session::get('userType');
        $role = Session::get('role');
        $userAllowedPages = json_decode(Session::get('userAllowedPages'), true);

        $result = $this->pageRuleClient->getByBrand(env('BRAND'));

        $allowedPages = null;

        if ($result->success) {
            foreach ($result->page_rules as $pageRule) {
                if (($type == $pageRule->type) && ($role == $pageRule->role)) {
                    $allowedPages = json_decode($pageRule->allowed_pages, true);

                    if ($userAllowedPages) {
                        $allowedPages = array_merge($allowedPages, $userAllowedPages);
                    }
                }
            }
        }

        if (! is_null($allowedPages) && (! empty($allowedPages))) {
            if (in_array($this->route->getName(), $allowedPages)) {
                return $next($request);
            }
        }

        if (env('ENDPOINT_VERSION') == 'v1-0') {
            return redirect()->route('v1_admin_dashboard');
        } else {
            return redirect()->route('admin_dashboard');
        }
    }
}
