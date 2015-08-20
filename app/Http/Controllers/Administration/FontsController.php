<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
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

    /**
     * Fonts
     */
    public function index()
    {
        $fonts = $this->client->getFonts();

        return view('administration.fonts.fonts', [
            'fonts' => $fonts
        ]);
    }

    public function addFontForm()
    {
        return view('administration.fonts.font-create');
    }

    public function editFontForm($id)
    {
        $font = $this->client->getFont($id);
        return view('administration.fonts.font-edit', [
            'font' => $font
        ]);
    }

    public function store(Request $request)
    {
        $fontName = $request->input('name');

        $fontId = null;
        if (!empty($request->input('font_id')))
        {
            $fontId = $request->input('font_id');
        }

        // Font Name should be Unique
        if ($this->client->isFontExist($fontName, $fontId))
        {
            return Redirect::to('administration/fonts')
                        ->with('message', 'Font name already exists');
        }

        $data = [
            'name' => $fontName
        ];

        try
        {
            $fontFile = $request->file('font_path');
            if (isset($fontFile))
            {
                if ($fontFile->isValid())
                {
                    $data['font_path'] = FileUploader::upload(
                        $fontFile,
                        $fontName,
                        'font',
                        'fonts'
                    );
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/fonts')
                            ->with('message', 'There was a problem uploading your files');
        }

        $response = null;
        if (!empty($fontId))
        {
            Log::info('Attempts to update Font#' . $fontId);
            $data['id'] = $fontId;
            $response = $this->client->updateFont($data);
        }
        else
        {
            Log::info('Attempts to create a new Font ' . json_encode($data));
            $response = $this->client->createFont($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/fonts')
                            ->with('message', $response->message);
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/fonts')
                            ->with('message', 'There was a problem saving your font');
        }
    }
}
