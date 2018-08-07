<?php

namespace App\Http\Controllers\Administration;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Utilities\Analytics;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    protected $analytics;

    public function __construct(Analytics $analytics)
    {
        $this->analytics = $analytics;    
    }
    
    public function index($startDate = null, $endDate = null)
    {
        if (! $startDate) {
            $date = new Carbon('first day of this month');
            $startDate  = $date->format('Y-m-d');
        }

        if (! $endDate) {
            $date = new Carbon('last day of this month');
            $endDate  = $date->format('Y-m-d');
        }

        $endpointVisits = $this->analytics->getEndpointVisits($startDate, $endDate);
 
        return view('administration.analytics.index', compact('endpointVisits', 'startDate', 'endDate'));
    }
}
