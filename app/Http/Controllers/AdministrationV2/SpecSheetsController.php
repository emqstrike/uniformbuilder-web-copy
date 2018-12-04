<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\SpecSheetsAPIClient as APIClient;

class SpecSheetsController extends Controller
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
        $spec_sheets = $this->client->getAll();

        return view('administration-lte-2.spec-sheets.spec-sheets', [
            'spec_sheets' => $spec_sheets
        ]);
    }

    public function exportExcel($id)
    {
        $spec_sheet = $this->client->getSpecSheet($id);
        return view('administration-lte-2.spec-sheets.spec-sheet-export', [
            'spec_sheet' => $spec_sheet
        ]);
    }
}
