<?php
namespace Customizer\Http\Controllers\Administration;

use \Redirect;
use Customizer\Http\Requests;
use Customizer\Utilities\Log;
use Illuminate\Http\Request;
use Customizer\Utilities\FileUploaderV2;
use Customizer\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use Customizer\Http\Controllers\Controller;

class TestsController extends Controller
{

    // public function __construct()
    // {

    // }

    public function uploadFileForm()
    {
        return view('administration.test-forms.test-upload');
    }

    public function store(Request $request)
    {
        $folder_name = "uploaded_files";
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
            return $data['file_path'];

        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/test/create')
                            ->with('message', 'There was a problem uploading your files');
        }

    }
}
