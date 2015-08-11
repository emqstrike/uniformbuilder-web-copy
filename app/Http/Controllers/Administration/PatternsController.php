<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\PatternsAPIClient as APIClient;

class PatternsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $patterns = $this->client->getPatterns();
        return view('administration.patterns.patterns', [
            'patterns' => $patterns
        ]);
    }

    public function editPatternForm($id)
    {
        $pattern = $this->client->getPattern($id);
        return view('administration.patterns.pattern-edit', [
            'pattern' => $pattern
        ]);
    }

    public function addPatternForm()
    {
        return view('administration.patterns.pattern-create');
    }

    public function store(Request $request)
    {
        $patternName = $request->input('name');

        $data = [
            'name' => $patternName
        ];

        $patternId = null;
        if (!empty($request->input('base_pattern_id')))
        {
            $patternId = $request->input('base_pattern_id');
            $data['id'] = $patternId;
        }

        // Does the Pattern Name exist
        if ($this->client->isPatternNameTaken($patternName, $patternId))
        {
            return Redirect::to('administration/patterns')
                            ->with('message', 'Pattern name already exist');
        }

        try
        {
            $patternFile = $request->file('pattern_path');
            if (isset($patternFile))
            {
                if ($patternFile->isValid())
                {
                    $data['base_pattern_path'] = FileUploader::upload(
                        $patternFile,
                        $patternName,
                        'base_pattern',
                        'patterns'
                    );
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/patterns')
                            ->with('message', 'There was a problem uploading your files');
        }

        $response = null;
        if (!empty($patternId))
        {
            $response = $this->client->updatePattern($data);
        }
        else
        {
            $response = $this->client->createPattern($data);
        }

        if ($response->success)
        {
            return Redirect::to('administration/patterns')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            return Redirect::to('administration/patterns')
                            ->with('message', $response->message);
        }
    }
}
