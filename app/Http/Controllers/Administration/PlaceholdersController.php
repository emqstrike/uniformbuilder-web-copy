<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use App\Utilities\Random;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\PlaceholdersAPIClient as APIClient;

class PlaceholdersController extends Controller
{
    protected $client;

    public function __construct(
        APIClient $apiClient
    )
    {
        $this->client = $apiClient;
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
        return view('administration.placeholders.placeholder-create');
    }

    public function store(Request $request)
    {
        $placeholderName = $request->input('name');
        $placeholderItemID = $request->input('item_id');
        $placeholderType = $request->input('type');

        $data = [
            'name' => $placeholderName,
            'item_id' => $placeholderItemID,
            'type' => $placeholderType
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
