<?php

namespace App\Http\Controllers\Administration;

use Storage;
use GuzzleHttp\Client;
use App\Http\Requests;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Utilities\TextureUploader;
use App\Http\Controllers\Controller;
use GuzzleHttp\Exception\ClientException;
use App\Utilities\HTTPBodyReader;
use App\Utilities\HTTPHeadReader;
use \Session;

class AdministrationController extends Controller
{
    protected $client;
    protected $apiHost;

    public function __construct($accessToken = null)
    {
        $settings = [
            'base_uri' => 'http://' . getenv('API_HOST') . '/api/',
        ];
        if (!is_null($accessToken))
        {
            $settings['headers'] = [
                'accessToken' => $accessToken
            ];
        }
        $this->client = new Client($settings);
    }

    public function index()
    {
        if (Session::has('isLoggedIn'))
        {
            if (Session::get('isLoggedIn') == true)
            {
                return view('welcome');
            }
        }
        return redirect('administration/login');
    }

    /**
     * Colors
     */
    public function colors()
    {
        $response = $this->client->get('colors');
        $decoder = new JsonDecoder();
        $result = $decoder->decode($response->getBody());

        $colors = [];
        if ($result->success)
        {
            $colors = $result->colors;
        }

        return view('administration/colors', [
            'colors' => $colors
        ]);
    }


    /**
     * Textures
     */
    public function textures()
    {
        $response = $this->client->get('textures');
        $decoder = new JsonDecoder();
        $result = $decoder->decode($response->getBody());

        $textures = [];
        if ($result->success)
        {
            $textures = $result->textures;
        }

        return view('administration/textures', [
            'textures' => $textures
        ]);
    }

    public function addTextureForm()
    {
        // dd(Storage::disk('s3'));
        return view('administration/texture-create');
    }

    public function createTexture(Request $request)
    {
        $textureName = $request->input('name');
        $slug = str_replace(' ', '-', strtolower($textureName));
        $response = $this->client->get('texture/' . $slug);
        $decoder = new JsonDecoder();
        $result = $decoder->decode($response->getBody());

        if (!$result->success)
        {
            $destinationPath = '/tmp/';

            // Texture Material File
            $textureFile = $request->file('texture_path');
            $texturePath = '';
            if (is_object($textureFile))
            {
                if ($textureFile->isValid())
                {
                    $texturePath = TextureUploader::upload($textureFile, getenv('S3_BUCKET'), $textureName);
                }
            }

            // Bump Map File
            $bumpMapFile = $request->file('bump_map_path');
            $bumpMapPath = '';
            if (is_object($bumpMapFile))
            {
                if ($bumpMapFile->isValid())
                {
                    $bumpMapPath = TextureUploader::upload($bumpMapFile, getenv('S3_BUCKET'), $textureName);
                }
            }

            $response = $this->client->post('texture', [
                'json' => [
                    'name' => $textureName,
                    'texture_path' => $texturePath,
                    'bump_map_path' => $bumpMapPath
                ]
            ]);

            return $response;
        }

        return [
            'success' => false,
            'message' => 'Texture Name already exists'
        ];
    }
}
