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

class FontsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $fonts = $this->client->getFonts();
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $sports = $categoriesAPIClient->getUniformCategories();

        $user_id = Session::get('userId');

        $superusers = env('BACKEND_SUPERUSERS');
        $su_array = explode(',', $superusers);

        return view('administration-lte-2.fonts.index', [
            'fonts' => $fonts,
            'sports' => $sports
        ]);
    }

    public function editFontForm($id)
    {
        $font = $this->client->getFont($id);
        $fonts = $this->client->getDefaultFonts();
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();
        $font->block_pattern_options = str_replace('"', "", $font->block_pattern_options);
        $font->block_patterns = str_replace('"', "", $font->block_patterns);

        return view('administration-lte-2.fonts.edit', [
            'fonts' => $fonts,
            'font' => $font,
            'categories' => $uniformCategories
        ]);
    }
}
