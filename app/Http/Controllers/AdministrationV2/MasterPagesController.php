<?php

namespace App\Http\Controllers\AdministrationV2;

use \Redirect;
use Session;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\FontsAPIClient as APIClient;

class MasterPagesController extends Controller
{

    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
        $this->masterFabricsAPIClient = new \App\APIClients\MasterFabricsAPIClient();
        $this->masterPatternsAPIClient = new \App\APIClients\MasterPatternsAPIClient();
        $this->masterFontsAPIClient = new \App\APIClients\MasterFontsAPIClient();
        $this->masterColorsAPIClient = new \App\APIClients\MasterColorsAPIClient();
        $this->styleRequestsAPIClient = new \App\APIClients\StyleRequestsAPIClient();
        $this->mascotsAPIClient = new \App\APIClients\MascotsAPIClient();
    }

    public function styleRequestIndex()
    {
        $style_requests = $this->styleRequestsAPIClient->getAll();
        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);

        $high_priority_count = 0;
        $in_progress_count = 0;
        $rejected_count = 0;
        $pending_count = 0;

        foreach($style_requests as $style_request)
        {
            if($style_request->priority == "high"){
                $high_priority_count++;
            }

            if($style_request->status == "in_progress"){
                $in_progress_count++;
            }

            if($style_request->status == "rejected"){
                $rejected_count++;
            }

            if($style_request->status == "pending"){
                $pending_count++;
            }
        }
        if (in_array($user_id, $su_array)) {
            return view('administration-lte-2.style-request.style-requests', [
                'style_requests' => $style_requests,
                'high_priority_count' => $high_priority_count,
                'in_progress_count' => $in_progress_count,
                'rejected_count' => $rejected_count,
                'pending_count' => $pending_count
            ]);
        } else {
                return redirect('administration');
        }
    }

    public function styleRequestAdd()
    {

        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);
        if (in_array($user_id, $su_array)) {
            return view('administration-lte-2.style-request.style-request-add');
        } else {
                return redirect('administration');
        }
    }

    public function fontsIndex()
    {
        $fonts = $this->masterFontsAPIClient->getAllFonts();

        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);
        if (in_array($user_id, $su_array)) {
            return view('administration-lte-2.master-pages.fonts.fonts', [
                'fonts' => $fonts
                ]);
        } else {
                return redirect('administration');
        }
    }

    public function fabricsIndex()
    {
        $fabrics = $this->masterFabricsAPIClient->getAllFabrics();

        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);
        if (in_array($user_id, $su_array)) {
            return view('administration-lte-2.master-pages.fabrics.fabrics', [
                'fabrics' => $fabrics
                ]);
        } else {
                return redirect('administration');
        }
    }

    public function patternsIndex()
    {
        $patterns = $this->masterPatternsAPIClient->getAllPatterns();

        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);
        if (in_array($user_id, $su_array)) {
            return view('administration-lte-2.master-pages.patterns.patterns', [
                'patterns' => $patterns
                ]);
        }
        else {
                return redirect('administration');
        }
    }

    public function colorsIndex()
    {
        $colors = $this->masterColorsAPIClient->getAllColors();

        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);
        if (in_array($user_id, $su_array)) {
            return view('administration-lte-2.master-pages.colors.master-colors', [
                'colors' => $colors
                ]);
        }
        else {
                return redirect('administration');
        }
    }

    public function mascotsIndex($active_sport = null)
    {
        if($active_sport == null) {
            $active_sport = "All";
        }

        $mascots = $this->mascotsAPIClient->getMascotBySport($active_sport);

        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);
        if (in_array($user_id, $su_array)) {
            return view('administration-lte-2.mascots.mascots', [
                'mascots' => $mascots,
                'active_sport' => $active_sport
                ]);
        }
        else {
                return redirect('administration');
        }
    }
}
