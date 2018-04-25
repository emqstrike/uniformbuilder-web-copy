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
        $this->masterFontsAPIClient = new \App\APIClients\MasterFontsAPIClient();
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

}
