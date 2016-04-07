<?php
namespace App\APIClients;

class BlockPatternsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getBlockPattern($id)
    {
        $response = $this->get('block_pattern/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->block_pattern;
        }
        return null;
    }

    public function getBlockPatterns()
    {
        $response = $this->get('block_patterns');
        $result = $this->decoder->decode($response->getBody());

        $block_patterns = [];
        if ($result->success)
        {
            $block_patterns = $result->block_patterns;
        }
        return $block_patterns;
    }

    // public function isCategoryTaken($name, $id = null)
    // {
    //     $response = $this->get('category/name/' . $name);
    //     $result = $this->decoder->decode($response->getBody());

    //     $category = null;
    //     if ($result->success)
    //     {
    //         $category = $result->category;
    //     }

    //     if (!is_null($category) && !is_null($id))
    //     {
    //         $compare = $this->getCategory($id);
    //         if ($category->id == $compare->id)
    //         {
    //             return false;
    //         }
    //     }
    //     return !is_null($category);
    // }

    // public function getCategoryByName($name)
    // {
    //     $response = $this->get('category/name/' . $name);
    //     $result = $this->decoder->decode($response->getBody());

    //     if ($result->success)
    //     {
    //         return $result->category;
    //     }
    //     return null;
    // }

    public function createBlockPattern($data)
    {
        $response = $this->post('block_pattern', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateBlockPattern($data)
    {
        $response = $this->post('block_pattern/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }
}