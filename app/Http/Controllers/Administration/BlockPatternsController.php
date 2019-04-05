<?php
namespace App\Http\Controllers\Administration;

use App\APIClients\BlockPatternsAPIClient as APIClient;
use App\APIClients\UniformCategoriesAPIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\BlockPatternRequest;
use App\Utilities\FileUploader;
use App\Utilities\FileUploaderV2;
use App\Utilities\Log;
use App\Utilities\Random;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use \Redirect;
use \Session;

class BlockPatternsController extends Controller
{
    protected $client;
    protected $uniformCategoriesClient;

    public function __construct(
        APIClient $apiClient,
        UniformCategoriesAPIClient $uniformCategoriesAPIClient
    )
    {
        $this->client = $apiClient;
        $this->uniformCategoriesClient = $uniformCategoriesAPIClient;
    }

    public function index()
    {
        $block_patterns = $this->client->getBlockPatterns();

        return view('administration.block-patterns.block-patterns', [
            'block_patterns' => $block_patterns
        ]);
    }

    public function editForm($id)
    {
        $block_pattern = $this->client->getBlockPattern($id);
        $uniform_categories = $this->uniformCategoriesClient->getUniformCategories();
        return view('administration.block-patterns.block-pattern-edit', [
            'block_pattern' => $block_pattern,
            'uniform_categories' => $uniform_categories
        ]);
    }

    public function addForm()
    {
        $uniform_categories = $this->uniformCategoriesClient->getUniformCategories();

        return view('administration.block-patterns.block-pattern-create', [
            'uniform_categories' => $uniform_categories
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
            'placeholder_overrides' => $placeholderOverrides
        ];

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
            return Redirect::to('/administration/block_patterns')->with('message', 'There was a problem uploading your files');
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
            return Redirect::to('/administration/block_patterns')->with('message', 'There was a problem uploading your files');
        }

        $myJson = json_decode($neckOptions, true);

        // Upload Neck Options Thumbnails
        try {
            $neckOptionsFiles = $request->file('neck_option_image');
            $neckOptionsFiles = (array) $neckOptionsFiles;

            $ctr = 1;

            foreach ($neckOptionsFiles as $key => $neckOptionsFile) {
                if (! is_null($neckOptionsFile)) {
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
            return Redirect::to('/administration/block_patterns')->with('message', 'There was a problem uploading your files');
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
            return Redirect::to('administration/block_patterns')->with('message', 'Successfully saved changes');
        } else {
            Log::info('Failed');
            return Redirect::to('administration/block_patterns')->with('message', $response->message);
        }
    }
}
