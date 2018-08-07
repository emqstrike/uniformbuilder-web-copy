<?php

namespace App\Http\Controllers\AdministrationV2;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Utilities\Analytics;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class AnalyticsController extends Controller
{
    protected $analytics;

    public function __construct(Analytics $analytics)
    {
        $this->analytics = $analytics;    
    }
    
    public function index()
    {
        if (Input::get('startDate')) {
            $startDate = Input::get('startDate');
        } else {
            $date = new Carbon('first day of this month');
            $startDate  = $date->format('Y-m-d');
        }

        if (Input::get('endDate')) {
            $endDate = Input::get('endDate');
        } else {
            $date = new Carbon('last day of this month');
            $endDate  = $date->format('Y-m-d');
        }

        $endpointVisits = $this->analytics->getEndpointVisits($startDate, $endDate);
 
        return view('administration-lte-2.analytics.index', compact('endpointVisits', 'startDate', 'endDate'));
    }
}