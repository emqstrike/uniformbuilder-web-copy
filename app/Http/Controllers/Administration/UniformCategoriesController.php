<?php
namespace App\Http\Controllers\Administration;

use App\APIClients\UniformCategoriesAPIClient as APIClient;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Http\Requests\UniformCategoryRequest;
use App\Utilities\FileUploader;
use App\Utilities\Log;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use \Redirect;
use \Session;

class UniformCategoriesController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $categories = $this->client->getUniformCategories();
        return view('administration.categories.categories', [
            'categories' => $categories
        ]);
    }

    public function editCategoryForm($id)
    {
        $category = $this->client->getCategory($id);
        return view('administration.categories.category-edit', [
            'category' => $category
        ]);
    }

    public function addCategoryForm()
    {
        return view('administration.categories.category-create');
    }

    public function store(UniformCategoryRequest $request)
    {

        $name = $request->input('name');
        $alias = $request->input('alias');
        $sizes = $request->input('sizes');
        $code = $request->input('code');
        $type = $request->input('type');
        $active_type = $request->input('active_type');
        $active_male = $request->input('active_male');
        $active_female = $request->input('active_female');
        $active_youth = $request->input('active_youth');
        $sort_order_male = $request->input('sort_order_male');
        $sort_order_female = $request->input('sort_order_female');
        $sort_order_youth = $request->input('sort_order_youth');

        $data = [
            'name' => $name,
            'alias' => $alias,
            'sizes' => $sizes,
            'code' => $code,
            'type' => $type,
            'active_type' => $active_type,
            'active_male' => $active_male,
            'active_female' => $active_female,
            'active_youth' => $active_youth,
            'sort_order_male' => $sort_order_male,
            'sort_order_female' => $sort_order_female,
            'sort_order_youth' => $sort_order_youth
        ];

        $id = null;
        if (!empty($request->input('uniform_category_id')))
        {
            $id = $request->input('uniform_category_id');
            $data['id'] = $id;
        }

        try {
            // Thumbnail Files
            $thumbnaleMale = $request->file('thumbnail_male');
            if (isset($thumbnaleMale))
            {
                if ($thumbnaleMale->isValid())
                {
                    $data['thumbnail_male'] = FileUploader::upload(
                                                    $thumbnaleMale,
                                                    $name,
                                                    'thumbnail',
                                                    "categories/{$name}/thumbnail_male.png"
                                                );
                }
            }

            $thumbnaleFemale = $request->file('thumbnail_female');
            if (isset($thumbnaleFemale))
            {
                if ($thumbnaleFemale->isValid())
                {
                    $data['thumbnail_female'] = FileUploader::upload(
                                                    $thumbnaleFemale,
                                                    $name,
                                                    'thumbnail',
                                                    "categories/{$name}/thumbnail_female.png"
                                                );
                }
            }

            $thumbnaleYouth = $request->file('thumbnail_youth');
            if (isset($thumbnaleYouth))
            {
                if ($thumbnaleYouth->isValid())
                {
                    $data['thumbnail_youth'] = FileUploader::upload(
                                                    $thumbnaleYouth,
                                                    $name,
                                                    'thumbnail',
                                                    "categories/{$name}/thumbnail_youth.png"
                                                );
                }
            }

        }
        catch (S3Exception $e)
        {
            $message = $e->getMessage();
            return Redirect::to('/administration/categories')
                            ->with('message', 'There was a problem uploading your files');
        }

        // Is the Category Name taken?
        if ($this->client->isCategoryTaken($name, $id))
        {
            return Redirect::to('administration/categories')
                            ->with('message', 'Uniform category already exist');
        }

        if ($request->input('type'))
        {
            $data['type'] = $request->input('type');
        }

        $response = null;
        if (!empty($id))
        {
            Log::info('Attempts to update UniformCategory#' . $id);
            $response = $this->client->updateCategory($data);
        }
        else
        {
            Log::info('Attempts to create a new Uniform Category ' . json_encode($data));
            $response = $this->client->createCategory($data);
        }

        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('administration/categories')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('administration/categories')
                            ->with('message', $response->message);
        }
    }
}
