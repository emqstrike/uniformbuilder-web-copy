<?php

namespace App\Http\Controllers\AdministrationV2;

use App\APIClients\ApplicationMapperClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Qx7APIClient\MasterBlockPatterClient;
use Illuminate\Http\Request;

class ApplicationMappersController extends Controller
{
    private $masterBlockPatternClient;

    public function __construct(ApplicationMapperClient $client, MasterBlockPatterClient $masterBlockPatternClient)
    {
        $this->client = $client;
        $this->masterBlockPatternClient = $masterBlockPatternClient;
    }

    public function index()
    {
        $applicationMappers = $this->client->getApplicationMappers();
        $masterBlockPatterns = $this->masterBlockPatternClient->getMasterBlockPatterns();

        return view('administration-lte-2.application-mapper.index', compact('applicationMappers', 'masterBlockPatterns'));
    }

    public function create()
    {
        $masterBlockPatterns = $this->masterBlockPatternClient->getMasterBlockPatterns();

        return view('administration-lte-2.application-mapper.create', compact('masterBlockPatterns'));
    }

    public function edit($id)
    {
        $applicationMapper = $this->client->getApplicationMapper($id);
        $masterBlockPatterns = $this->masterBlockPatternClient->getMasterBlockPatterns();

        return view('administration-lte-2.application-mapper.edit', compact('applicationMapper', 'masterBlockPatterns'));
    }

    public function store(Request $request)
    {
        $result = $this->client->store($request->all());

        if (isset($result->errors)) {
            return back()->with('flash_message_error', $result->message);
        }

        return redirect()->route('v1_application_mappers')->with('flash_message_success', $result->message);
    }

    public function update(Request $request)
    {
        $result = $this->client->update($request->all());

        if (isset($result->errors)) {
            return back()->with('flash_message_error', $result->message);
        }

        return redirect()->route('v1_application_mappers')->with('flash_message_success', $result->message);
    }
}
