<?php
namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploaderV2;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
// use App\APIClients\ColorsAPIClient;
// use App\APIClients\FactoriesAPIClient;
// use App\APIClients\GradientsAPIClient;
// use App\APIClients\ApplicationsAPIClient;
// use App\APIClients\BoundariesAPIClient;
// use App\APIClients\FontsAPIClient;
// use App\APIClients\BlockPatternsAPIClient;
// use App\APIClients\MaterialsOptionsAPIClient;
// use App\APIClients\MaterialsAPIClient as APIClient;

class TestsController extends Controller
{

    public function __construct()
    {

    }

    public function uploadFileForm()
    {
        return view('administration.test-forms.test-upload');
    }

    public function store(Request $request)
    {
        $folder_name = $request->input('folder_name');
        $data = [];

        try {

            $newFile = $request->file('file');
            if (isset($newFile))
            {
                if ($newFile->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['file_path'] = FileUploaderV2::upload(
                                                    $newFile,
                                                    $randstr,
                                                    'file',
                                                    $folder_name
                                                );
                }
            }

        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/test/create')
                            ->with('message', 'There was a problem uploading your files');
        }

    }
}
