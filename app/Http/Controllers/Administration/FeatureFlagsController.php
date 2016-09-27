<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;
use App\APIClients\FeatureFlagsAPIClient as APIClient;

class FeatureFlagsController extends Controller
{
    protected $client;
    // protected $featureFlagsClient;

    public function __construct(
        APIClient $apiClient
        // FeatureFlagsAPIClient $featureFlagsClient
    )
    {
        $this->client = $apiClient;
        // $this->featureFlagsClient = $FeatureFlagsAPIClient;
    }

    public function index()
    {
        $feature_flags = $this->client->getFeatureFlags();

        return view('administration.feature-flags.feature-flags', [
            'feature_flags' => $feature_flags
        ]);
    }

    // public function editForm($id)
    // {
    //     $block_pattern = $this->client->getBlockPattern($id);
    //     $uniform_categories = $this->featureFlagsClient->getUniformCategories();

    //     return view('administration.block-patterns.block-pattern-edit', [
    //         'block_pattern' => $block_pattern,
    //         'uniform_categories' => $uniform_categories
    //     ]);
    // }

    // public function addForm()
    // {
    //     $uniform_categories = $this->featureFlagsClient->getUniformCategories();

    //     return view('administration.block-patterns.block-pattern-create', [
    //         'uniform_categories' => $uniform_categories
    //     ]);
    // }

    // public function store(Request $request)
    // {
    //     $name = $request->input('name');
    //     $uniformCategoryID = $request->input('uniform_category_id');
    //     $neckOptions = $request->input('neck_options');
    //     $data = [
    //         'name' => $name,
    //         'uniform_category_id' => $uniformCategoryID
    //     ];

    //     $id = null;
    //     if (!empty($request->input('block_pattern_id')))
    //     {
    //         $id = $request->input('block_pattern_id');
    //         $data['id'] = $id;
    //     }

    //     try {
    //         // Thumbnail Files
    //         $thumbnailFile = $request->file('thumbnail_file');
    //         if (isset($thumbnailFile))
    //         {
    //             if ($thumbnailFile->isValid())
    //             {
    //                 $data['thumbnail_path'] = FileUploader::upload(
    //                                                 $thumbnailFile,
    //                                                 $name,
    //                                                 'thumbnail',
    //                                                 "block_pattern/{name}/thumbnail.png"
    //                                             );
    //             }
    //         }

    //     }
    //     catch (S3Exception $e)
    //     {
    //         $message = $e->getMessage();
    //         return Redirect::to('/administration/block_patterns')
    //                         ->with('message', 'There was a problem uploading your files');
    //     }

    //     $myJson = json_decode($neckOptions, true);
    //     // Upload Neck Options Thumbnails
    //     try
    //     {
    //         $neckOptionsFiles = $request->file('neck_option_image');
    //         $ctr = 1;
    //         foreach ($neckOptionsFiles as $neckOptionsFile) {
    //             if (!is_null($neckOptionsFile))
    //             {
    //                 if ($neckOptionsFile->isValid())
    //                 {
    //                     // $filename = Random::randomize(12);
    //                     $filename = $myJson[(string)$ctr]['name'];
    //                     $filename = str_replace(' ', '', $filename);
    //                     $myJson[(string)$ctr]['thumbnail_path'] = FileUploader::upload(
    //                                                                 $neckOptionsFile,
    //                                                                 $name,
    //                                                                 'material_option',
    //                                                                 "materials",
    //                                                                 "{$name}/{$filename}.png"
    //                                                             );
    //                 }
    //             }
    //             $ctr++;
    //         }
    //     }
    //     catch (S3Exception $e)
    //     {
    //         $message = $e->getMessage();
    //         return Redirect::to('/administration/block_patterns')
    //                         ->with('message', 'There was a problem uploading your files');
    //     }
    //     $data['neck_options'] = json_encode($myJson, JSON_UNESCAPED_SLASHES);

    //     $response = null;
    //     if (!empty($id))
    //     {
    //         Log::info('Attempts to update Block Pattern #' . $id);
    //         $response = $this->client->updateBlockPattern($data);
    //     }
    //     else
    //     {
    //         Log::info('Attempts to create a new Block Pattern ' . json_encode($data));
    //         $response = $this->client->createBlockPattern($data);
    //     }

    //     if ($response->success)
    //     {
    //         Log::info('Success');
    //         return Redirect::to('administration/block_patterns')
    //                         ->with('message', 'Successfully saved changes');
    //     }
    //     else
    //     {
    //         Log::info('Failed');
    //         return Redirect::to('administration/block_patterns')
    //                         ->with('message', $response->message);
    //     }
    // }
}
