<?php

namespace App\Http\Controllers\AdministrationV2;

use App\Qx7APIClient\Qx7StyleRequestClient as StyleRequestClient;
use App\APIClients\LookupCutToStylesAPIClient as APIClient;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LookupCutsToStylesController extends Controller
{
    protected $apiClient;
    protected $styleRequestClient;

    public function __construct(
        APIClient $apiClient,
        StyleRequestClient $styleRequestClient
    ) {
        $this->client = $apiClient;
        $this->styleRequestClient = $styleRequestClient;
        $this->styles = [];
    }

    public function index()
    {
        return view('administration-lte-2.lookup-cuts-to-styles.index');
    }

    public function upload(Request $request)
    {
        \Excel::load($request->file('file'), function ($reader) {
            $style_requests = $this->styleRequestClient->getAllStyleRequests();
            $reader->first()->each(function ($row) use ($style_requests) {
                if (!empty($row['style_id'])) {
                    foreach($style_requests as $style_request) {
                        if (!empty($style_request->style_id) && $style_request->style_id == $row['style_id']) {
                            $style = [
                                'style_id' => (int) $row['customizer_id'],
                                'cut_id' => $style_request->rule->block_pattern_id,
                                'alias' => $row['style_names_qx7'],
                                'style_category' => strtolower($style_request->style_category->style_category),
                                'gender' => str_replace("'s", "", strtolower($style_request->gender->gender)),
                            ];
                            array_push($this->styles, $style);
                        }
                    }
                }
            });
        });

        if (!empty($this->styles)){
            $result = $this->client->createLookupCutToStylesMultiple($this->styles);
            if ($result->success) {
                return redirect()->back()->with('message', $result->message);
            }
            return redirect()->back()->with('error_message', $result->message);
        }

        return redirect()->back()->with('error_message', 'Please choose a valid file.');
    }
}
