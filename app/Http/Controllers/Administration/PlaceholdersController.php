<?php

namespace Customizer\Http\Controllers\Administration;

use \Redirect;
use Customizer\Http\Requests;
use Customizer\Utilities\Log;
use Customizer\Utilities\Random;
use Illuminate\Http\Request;
use Customizer\Utilities\FileUploader;
use Aws\S3\Exception\S3Exception;
use Customizer\Http\Controllers\Controller;
use Customizer\APIClients\UniformCategoriesAPIClient;
use Customizer\APIClients\PlaceholdersAPIClient as APIClient;

class PlaceholdersController extends Controller
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
        $placeholders = $this->client->getPlaceholders();
        return view('administration.placeholders.placeholders', [
            'placeholders' => $placeholders
        ]);
    }

    public function addPlaceholderForm()
    {
        $uniform_categories = $this->uniformCategoriesClient->getUniformCategories();
        return view('administration.placeholders.placeholder-create', [
            'uniform_categories' => $uniform_categories
        ]);
    }

    public function store(Request $request)
    {
        $placeholderName = $request->input('name');
        $placeholderItemID = $request->input('item_id');
        $placeholderType = $request->input('type');
        $placeholderUCId = $request->input('sport');

        $data = [
            'name' => $placeholderName,
            'item_id' => $placeholderItemID,
            'type' => $placeholderType,
            'uniform_category_id' => $placeholderUCId
        ];

        $placeholderId = null;
        if (!empty($request->input('base_pattern_id')))
        {
            $placeholderId = $request->input('base_pattern_id');
            $data['id'] = $placeholderId;
        }

        try
        {
            $frontThumbnailFile = $request->file('thumbnail_front');
            if (isset($frontThumbnailFile))
            {
                if ($frontThumbnailFile->isValid())
                {
                    $data['thumbnail_front'] = FileUploader::upload(
                        $frontThumbnailFile,
                        $placeholderName,
                        'front_thumbnail',
                        'placeholders'
                    );
                }
            }

            $backThumbnailFile = $request->file('thumbnail_back');
            if (isset($backThumbnailFile))
            {
                if ($backThumbnailFile->isValid())
                {
                    $data['thumbnail_back'] = FileUploader::upload(
                        $backThumbnailFile,
                        $placeholderName,
                        'back_thumbnail',
                        'placeholders'
                    );
                }
            }

            $leftThumbnailFile = $request->file('thumbnail_left');
            if (isset($leftThumbnailFile))
            {
                if ($leftThumbnailFile->isValid())
                {
                    $data['thumbnail_left'] = FileUploader::upload(
                        $leftThumbnailFile,
                        $placeholderName,
                        'left_thumbnail',
                        'placeholders'
                    );
                }
            }

            $rightThumbnailFile = $request->file('thumbnail_right');
            if (isset($rightThumbnailFile))
            {
                if ($rightThumbnailFile->isValid())
                {
                    $data['thumbnail_right'] = FileUploader::upload(
                        $rightThumbnailFile,
                        $placeholderName,
                        'right_thumbnail',
                        'placeholders'
                    );
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/placeholders')
                            ->with('message', 'There was a problem uploading your files');
        }

        $response = null;
        if (!empty($placeholderId))
        {
            Log::info('Attempts to update Pattern#' . $placeholderId);
            // $response = $this->client->updatePattern($data);
        }
        else
        {
            Log::info('Attempts to create a new Pattern ' . json_encode($data));
            $response = $this->client->createPlaceholder($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/placeholders')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/placeholders')
                            ->with('message', $response->message);
        }
    }
}
