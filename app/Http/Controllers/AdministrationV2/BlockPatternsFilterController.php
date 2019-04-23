<?php

namespace App\Http\Controllers\AdministrationV2;

use App\APIClients\NewBlockPatternClient;
use App\APIClients\UniformCategoriesAPIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;

class BlockPatternsFilterController extends Controller
{
    private $uniformCategoriesClient;
    private $newBlockPatternClient;

    public function __construct(
        UniformCategoriesAPIClient $uniformCategoriesClient,
        NewBlockPatternClient $newBlockPatternClient
    ) {
        $this->uniformCategoriesClient = $uniformCategoriesClient;
        $this->newBlockPatternClient = $newBlockPatternClient;
    }

    public function index()
    {
        $newBlockPatterns = json_encode($this->newBlockPatternClient->getAll());

        return view('administration-lte-2.master-pages.block-pattern-filters.index', compact(
            'newBlockPatterns'
        ));
    }

    public function create()
    {
        $uniformCategories = $this->uniformCategoriesClient->getUniformCategories();

        return view('administration-lte-2.master-pages.block-pattern-filters.create', compact(
            'uniformCategories'
        ));
    }

    public function store(Request $request)
    {
        $result = $this->newBlockPatternClient->create($request->all());

        if (isset($result->errors)) {
            return back()->with('flash_message_error', $result->errors);
        }

        return redirect()->route('v1_block_pattern_filters')->with('flash_message_success', 'Block pattern filter created');
    }

    public function edit($id)
    {
        $newBlockPattern = $this->newBlockPatternClient->getById($id);

        $uniformCategories = $this->uniformCategoriesClient->getUniformCategories();
        
        return view('administration-lte-2.master-pages.block-pattern-filters.edit', compact(
            'newBlockPattern',
            'uniformCategories'
        ));
    }

    public function update(Request $request)
    {
        $result = $this->newBlockPatternClient->update($request->all());

        if (isset($result->errors)) {
            return back()->with('flash_message_error', $result->errors);
        }

        return redirect()->route('v1_block_pattern_filters')->with('flash_message_success', 'Block pattern filter updated');
    }
}
