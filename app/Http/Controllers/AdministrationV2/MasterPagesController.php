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
    }

    public function fontsIndex()
    {
        // $fonts = $this->client->getAllFonts();
        // $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        // $sports = $categoriesAPIClient->getUniformCategories();
        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);
        if (in_array($user_id, $su_array)) {
            return view('administration-lte-2.master-pages.fonts.fonts', [
                // 'fonts' => $fonts,
                // 'sports' => $sports
                ]);
        }
        else {
                return redirect('administration');
        }
    }

    public function fabricsIndex()
    {
        $user_id = Session::get('userId');
        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);
        if (in_array($user_id, $su_array)) {
            return view('administration-lte-2.master-pages.fabrics.fabrics');
        }
        else {
                return redirect('administration');
        }
    }

}
