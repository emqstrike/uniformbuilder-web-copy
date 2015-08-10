<?php
namespace App\APIClients;

class UniformCategoriesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
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
}