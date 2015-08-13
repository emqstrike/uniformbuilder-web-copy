<?php
namespace App\Http\Controllers\Administration;

use \Redirect;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use Aws\S3\Exception\S3Exception;
use App\Http\Controllers\Controller;
use App\APIClients\MaterialsAPIClient as APIClient;

class MaterialsController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    /**
     * Materials
     */
    public function index()
    {
        $materials = $this->client->getMaterials();

        return view('administration.materials.materials', [
            'materials' => $materials
        ]);
    }

    public function delete($id)
    {
        return $this->client->deleteMaterial($id);
    }

    public function editMaterialForm($id)
    {
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();

        $colorsAPIClient = new \App\APIClients\ColorsAPIClient();
        $colors = $colorsAPIClient->getColors();

        $material = $this->client->getMaterial($id);
        return view('administration.materials.material-edit', [
            'material' => $material,
            'uniform_categories' => $uniformCategories,
            'colors' => $colors
        ]);
    }

    public function addMaterialForm()
    {
        $categoriesAPIClient = new \App\APIClients\UniformCategoriesAPIClient();
        $uniformCategories = $categoriesAPIClient->getUniformCategories();

        $colorsAPIClient = new \App\APIClients\ColorsAPIClient();
        $colors = $colorsAPIClient->getColors();
        return view('administration.materials.material-create', [
            'uniform_categories' => $uniformCategories,
            'colors' => $colors
        ]);
    }

    public function store(Request $request)
    {
        $materialName = $request->input('name');
        $materialCode = $request->input('code');
        $factoryCode = $request->input('factory_code');
        $type = $request->input('type');
        $gender = $request->input('gender');
        $uniformCategoryId = $request->input('uniform_category_id');
        $colorCode = $request->input('color_code');
        $liningType = $request->input('lining_type');
        $slug = FileUploader::makeSlug($materialName);

        $materialId = null;
        if (!empty($request->input('material_id')))
        {
            $materialId = $request->input('material_id');
        }

        // Does the Material Name and Codes Exist?
        if ($this->client->isMaterialExist($materialName, $materialId))
        {
            return Redirect::to('/administration/materials')
                            ->with('message', 'Material Name already exists');
        }
        if ($this->client->isMaterialCodeExist($materialCode, $materialId))
        {
            return Redirect::to('/administration/materials')
                            ->with('message', 'Material Code already exists');
        }

        $data = [
            'id' => $materialId,
            'name' => $materialName,
            'slug' => $slug,
            'type' => $type,
            'code' => $materialCode,
            'gender' => $gender,
            'uniform_category_id' => $uniformCategoryId,
            'color_code' => $colorCode,
            'lining_type' => $liningType,
            'factory_code' => $factoryCode
        ];

        try {
            // Bump Map File
            $bumpMapFile = $request->file('bump_map_path');
            if (isset($bumpMapFile))
            {
                if ($bumpMapFile->isValid())
                {
                    $data['bump_map_path'] = FileUploader::upload(
                                                    $bumpMapFile,
                                                    $materialName,
                                                    'bump'
                                                );
                }
            }

            // Material File
            $materialFile = $request->file('material_path');
            if (isset($materialFile))
            {
                if ($materialFile->isValid())
                {
                    // Material
                    $data['material_path'] = FileUploader::upload(
                                                    $materialFile,
                                                    $materialName
                                                );
                    // Generate a Thumbnail from the Base Material ONLY IF no thumbnail will be uploaded
                    if (is_null($request->file('thumbnail_path')))
                    {
                        // Thumbnail
                        $data['thumbnail_path'] = FileUploader::upload(
                                                        $materialFile,
                                                        $materialName,
                                                        'thumbnail'
                                                    );
                    }
                }
            }

            // Shadow File
            $shadowFile = $request->file('shadow_path');
            if (isset($shadowFile))
            {
                if ($shadowFile->isValid())
                {
                    // Shadow
                    $data['shadow_path'] = FileUploader::upload(
                                                $shadowFile,
                                                $materialName,
                                                'shadow'
                                            );
                }
            }

            // Highlight File
            $highlightFile = $request->file('highlight_path');
            if (isset($highlightFile))
            {
                if ($highlightFile->isValid())
                {
                    // Highlight
                    $data['highlight_path'] = FileUploader::upload(
                                                    $highlightFile,
                                                    $materialName,
                                                    'highlight'
                                                );
                }
            }

            // Thumbnail File
            $thumbnailFile = $request->file('thumbnail_path');
            if (isset($thumbnailFile))
            {
                if ($thumbnailFile->isValid())
                {
                    // Highlight
                    $data['thumbnail_path'] = FileUploader::upload(
                                                    $thumbnailFile,
                                                    $materialName,
                                                    'thumbnail'
                                                );
                }
            }
        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/materials')
                            ->with('message', 'There was a problem uploading your files');
        }

        $response = null;
        if (!empty($materialId))
        {
            $response = $this->client->updateMaterial($data);
        }
        else
        {
            $response = $this->client->createMaterial($data);
        }

        if ($response->success)
        {
            return Redirect::to('/administration/materials')
                            ->with('message', $response->message);
        }
        else
        {
            return Redirect::to('/administration/materials')
                            ->with('message', 'There was a problem saving your material');
        }

    }
}
