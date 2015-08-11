<?php
namespace App\Http\Controllers\Administration;

use \Session;
use \Redirect;
use App\Http\Requests;
use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;
use App\APIClients\UniformCategoriesAPIClient as APIClient;

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

    public function store(Request $request)
    {
        $name = $request->input('name');
        $data = [
            'name' => $name
        ];

        $id = null;
        if (!empty($request->input('uniform_category_id')))
        {
            $id = $request->input('uniform_category_id');
            $data['id'] = $id;
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
        if (!empty($userId))
        {
            $response = $this->client->updateCategory($data);
        }
        else
        {
            $response = $this->client->createCategory($data);
        }

        if ($response->success)
        {
            return Redirect::to('administration/categories')
                            ->with('message', 'Successfully saved changes');
        }
        else
        {
            return Redirect::to('administration/categories')
                            ->with('message', $response->message);
        }
    }
}
