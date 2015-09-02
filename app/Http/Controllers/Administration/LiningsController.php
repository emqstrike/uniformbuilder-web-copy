<?php

namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\LiningsAPIClient as APIClient;

class LiningsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $linings = $this->client->getLinings();
        return view('administration.linings.linings', [
            'linings' => $linings
        ]);
    }

    public function editForm($id)
    {
        $lining = $this->client->getLining($id);
        return view('administration.linings.lining-edit', [
            'lining' => $lining
        ]);
    }

    public function addForm()
    {
        return view('administration.linings.lining-create');
    }

    public function store(Request $request)
    {
        $liningName = $request->input('name');
        $liningCode = $request->input('code');

        $data = [
            'name' => $liningName,
            'code' => $liningCode
        ];

        $liningId = null;
        if (!empty($request->input('lining_id')))
        {
            $liningId = $request->input('lining_id');
            $data['id'] = $liningId;
        }

        // Does the Lining Name exist
        if ($this->client->isLiningCodeTaken($liningCode, $liningId))
        {
            return Redirect::to('administration/linings')
                            ->with('message', 'Lining code already exist');
        }

        $response = null;
        if (!empty($liningId))
        {
            Log::info('Attempts to update Lining#' . $liningId);
            $response = $this->client->updateLining($data);
        }
        else
        {
            Log::info('Attempts to create a new Lining ' . json_encode($data));
            $response = $this->client->createLining($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/linings')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/linings')
                            ->with('message', $response->message);
        }
    }


}
