<?php
namespace App\APIClients;

class MascotsCategoriesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getMascotCategories()
    {
        $response = $this->get('mascot_categories');
        $result = $this->decoder->decode($response->getBody());

        $mascots_categories = [];
        if ($result->success)
        {
            $mascots_categories = $result->mascots_categories;
        }
        return $mascots_categories;
    }

    public function isMascotCategoryTaken($name, $id)
    {
        $response = $this->get('mascot_category/name/' . $name);
        $result = $this->decoder->decode($response->getBody());

        $mascot_category = null;
        if ($result->success)
        {
            $mascot_category = $result->mascot_category;
        }

        if (!is_null($mascot_category) && !is_null($id))
        {
            $compare = $this->getMascotCategory($id);//dd($compare);
            try
            {
                if ($mascot_category->id == $compare->mascot_category->id)
                {
                    return false;
                }
            } catch (QueryException $e) {
                $error = $e->getMessage();
            } catch (Exception $e) {
                $error = $e->getMessage();
            }
        }
        return !is_null($mascot_category);
    }

    public function getMascotCategoryByName($name)
    {
        $response = $this->get('mascot_category/name/' . $name);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->mascot_category;
        }
        return null;
    }

    public function getMascotCategory($id)
    {
        $response = $this->get('mascot_category/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->mascot_category;
        }
        return null;
    }

    public function createMascotCategory($data)
    {
        $response = $this->post('mascot_category', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateMascotCategory($data)
    {
        $response = $this->post('mascot_category/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }
}