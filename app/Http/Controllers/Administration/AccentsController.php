<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\AccentsAPIClient as APIClient;

class AccentsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    /**
     * Colors
     */
    public function create()
    {
        return view("administration.accents.accent-create");
    }

    public function store(Request $request){
        $accentName = $request->input('name');
        $accentCode = $request->input('code');
        $accentProperties = $request->input('accent_properties');

        $data = [
            'name' => $accentName,
            'code' => $accentCode,
            'accent_properties' => $accentProperties
        ];

        $materialFolder = $accentName;

        try {
            $accentThumbnailPath = $request->file('thumbnail_path');
            if (isset($accentThumbnailPath))
            {
                if ($accentThumbnailPath->isValid())
                {
                    $filename = Random::randomize(12);
                    $data['thumbnail_path'] = FileUploader::upload(
                                                    $accentThumbnailPath,
                                                    $accentName,
                                                    'material_option',
                                                    "materials",
                                                    "{$accentName}/{$filename}.png"
                                                );
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/accents')
                            ->with('message', 'There was a problem uploading your files');
        }

        $response = $this->client->createAccent($data);

    }

 
    
}
