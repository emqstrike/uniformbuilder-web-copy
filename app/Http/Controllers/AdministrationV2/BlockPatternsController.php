<?php

namespace App\Http\Controllers\AdministrationV2;

use App\APIClients\BlockPatternsAPIClient as APIClient;
use App\APIClients\ColorsAPIClient;
use App\APIClients\FabricsAPIClient;
use App\APIClients\UniformCategoriesAPIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\BlockPatternRequest;
use App\Utilities\FileUploader;
use App\Utilities\FileUploaderV2;
use App\Utilities\Log;
use App\Utilities\Random;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Webmozart\Json\JsonDecoder;
use \Redirect;
use \Session;

class BlockPatternsController extends Controller
{
    protected $client;
    protected $uniformCategoriesClient;
    protected $colorsAPIClient;
    protected $fabricsClient;

    public function __construct(
        APIClient $apiClient,
        UniformCategoriesAPIClient $uniformCategoriesAPIClient,
        ColorsAPIClient $colorsAPIClient,
        FabricsAPIClient $fabricsClient
    )
    {
        $this->client = $apiClient;
        $this->uniformCategoriesClient = $uniformCategoriesAPIClient;
        $this->colorsAPIClient = $colorsAPIClient;
        $this->fabricsClient = $fabricsClient;
    }

    public function index()
    {
        $filters = [];

        if (Input::get('sport')) {
            $filters['sport'] = Input::get('sport');
        }

        if (Input::get('gender')) {
            $filters['gender'] = Input::get('gender');
        }

        $block_patterns = $this->client->getFiltered($filters);
        
        $uniformCategories = $this->uniformCategoriesClient->getUniformCategories();

        return view('administration-lte-2.master-pages.block-patterns.index', [
            'block_patterns' => $block_patterns,
            'uniformCategories' => $uniformCategories,
            'filters' => $filters,
        ]);
    }

    public function editForm($id)
    {
        $block_pattern = $this->client->getBlockPattern($id);
        $uniform_categories = $this->uniformCategoriesClient->getUniformCategories();
        $colors = $this->colorsAPIClient->getColors();
        $fabrics = $this->fabricsClient->getFabrics();

        $fabrics = array_map(function($fabric) {
            return array(
                'id' => $fabric->id,
                'text' => $fabric->material
            );
        }, $fabrics);

        return view('administration-lte-2.master-pages.block-patterns.edit', [
            'block_pattern' => $block_pattern,
            'uniform_categories' => $uniform_categories,
            'colors' => $colors,
            'fabrics' => $fabrics
        ]);
    }

    public function addForm()
    {
        $uniform_categories = $this->uniformCategoriesClient->getUniformCategories();
        $colors = $this->colorsAPIClient->getColors();
        $fabrics = $this->fabricsClient->getFabrics();

        $fabrics = array_map(function($fabric) {
            return array(
                'id' => $fabric->id,
                'text' => $fabric->material
            );
        }, $fabrics);

        return view('administration-lte-2.master-pages.block-patterns.create', [
            'uniform_categories' => $uniform_categories,
            'colors' => $colors,
            'fabrics' => $fabrics
        ]);
    }

    public function store(BlockPatternRequest $request)
    {
        $name = $request->input('name');
        $uniformCategoryID = $request->input('uniform_category_id');
        $neckOptions = $request->input('neck_options');
        $placeholderOverrides = $request->input('placeholder_overrides');

        $data = [
            'name' => $name,
            'uniform_category_id' => $uniformCategoryID,
            'placeholder_overrides' => $placeholderOverrides,
            'gender' => $request->input('gender'),
            'alias' => $request->input('alias'),
            'block_pattern_option_2' => $request->input('block_pattern_option_2')
        ];

        foreach ($request->part_name as $key => $value) {
            $data['parts_fabrics'][] = array(
                'name' => $value,
                'fabric_ids' => explode(',', $request->part_fabrics[$key])
            );
        }

        $data['parts_fabrics'] = json_encode($data['parts_fabrics']);

        $id = null;

        if (!empty($request->input('block_pattern_id'))) {
            $id = $request->input('block_pattern_id');
            $data['id'] = $id;
        }

        try {
            // Thumbnail Files
            $thumbnailFile = $request->file('thumbnail_file');
            if (isset($thumbnailFile)) {
                if ($thumbnailFile->isValid()) {
                    $data['thumbnail_path'] = FileUploader::upload($thumbnailFile, $name, 'thumbnail', "block_pattern/thumbnail");
                }
            }

        } catch (S3Exception $e) {
            $message = $e->getMessage();
            return redirect()->route('v1_block_patterns')->with('message', 'There was a problem uploading your files');
        }

        try {
            $folder_name = "cut_preview";

            // Cut Preview
            $cutPreview = $request->file('cut_preview');

            if (isset($cutPreview)) {
                if ($cutPreview->isValid()) {
                    $randstr = Random::randomize(12);
                    $data['cut_preview'] = FileUploader::upload($cutPreview, $randstr, 'thumbnail', $folder_name);
                }
            }

        } catch (S3Exception $e) {
            $message = $e->getMessage();
            return redirect()->route('v1_block_patterns')->with('message', 'There was a problem uploading your files');
        }

        $myJson = json_decode($neckOptions, true);

        // Upload Neck Options Thumbnails
        try {
            $neckOptionsFiles = $request->file('neck_option_image');
            $neckOptionsFiles = (array) $neckOptionsFiles;

            $ctr = 1;
            foreach ($neckOptionsFiles as $key => $neckOptionsFile) {
                if (!is_null($neckOptionsFile)) {
                    if ($neckOptionsFile->isValid()) {
                        // $filename = Random::randomize(12);
                        $filename = $myJson[$key + 1]['name'];
                        $filename = str_replace(' ', '', $filename);
                        $myJson[$key + 1]['thumbnail_path'] = FileUploader::upload(
                            $neckOptionsFile,
                            $name,
                            'material_option',
                            "materials",
                            "{$name}/{$filename}-". time() . ".png"
                        );
                    }
                }

                $ctr++;
            }
        } catch (S3Exception $e) {
            $message = $e->getMessage();
            return redirect()->route('v1_block_patterns')->with('message', 'There was a problem uploading your files');
        }

        $data['neck_options'] = json_encode($myJson, JSON_UNESCAPED_SLASHES);

        $response = null;

        if (!empty($id)) {
            Log::info('Attempts to update Block Pattern #' . $id);

            if (! count(json_decode($data['neck_options'], true)) > 0) {
                return back()->with('flash_message_error', 'Please add at least 1 neck option');
            } 
            
            $response = $this->client->updateBlockPattern($data);
        } else {
            if (! count(json_decode($data['neck_options'], true)) > 0) {
                return back()->with('flash_message_error', 'Please add at least 1 neck option');
            } 

            Log::info('Attempts to create a new Block Pattern ' . json_encode($data));
            $response = $this->client->createBlockPattern($data);
        }

        if ($response->success) {
            Log::info('Success');
            return redirect()->route('v1_block_patterns')->with('message', 'Successfully saved changes');
        } else {
            Log::info('Failed');
            return redirect()->route('v1_block_patterns')->with('message', $response->message);
        }
    }
}
