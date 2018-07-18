<?php
namespace App\APIClients;

class UniformCategoriesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getCategory($id)
    {
        $response = $this->get('category/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->category;
        }
        return null;
    }

    public function getUniformCategories()
    {
        $response = $this->get('categories');
        $result = $this->decoder->decode($response->getBody());

        $categories = [];
        if ($result->success)
        {
            $categories = $result->categories;
        }
        return $categories;
    }

    public function getTotalCount()
    {
        $response = $this->get('categories/total_count');
        $result = $this->decoder->decode($response->getBody());

        $count = 0;

        if ($result->success) {
            $count = $result->count;
        }
        
        return $count;
    }

    public function isCategoryTaken($name, $id = null)
    {
        $response = $this->get('category/name/' . $name);
        $result = $this->decoder->decode($response->getBody());

        $category = null;
        if ($result->success)
        {
            $category = $result->category;
        }

        if (!is_null($category) && !is_null($id))
        {
            $compare = $this->getCategory($id);
            if ($category->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($category);
    }

    public function getCategoryByName($name)
    {
        $response = $this->get('category/name/' . $name);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->category;
        }
        return null;
    }

    public function createCategory($data)
    {
        $response = $this->post('category', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateCategory($data)
    {
        $response = $this->post('category/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }
}