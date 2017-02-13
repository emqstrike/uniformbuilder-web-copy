<?php
namespace App\APIClients;

class MascotsGroupsCategoriesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getMascotsGroupsCategories()
    {
        $response = $this->get('mascots_groups_categories');
        $result = $this->decoder->decode($response->getBody());

        $mascots_groups_categories = [];
        if ($result->success)
        {
            $mascots_groups_categories = $result->mascots_groups_categories;
        }
        return $mascots_groups_categories;
    }

    public function isMascotGroupCategoryTaken($name, $id)
    {
        $response = $this->get('mascot_group_category/name/' . $name);

        $result = $this->decoder->decode($response->getBody());

        $mascot_group_category = null;
        if ($result->success)
        {

            $mascot_group_category = $result->mascot_group_category;
        }


        if (!is_null($mascot_group_category) && !is_null($id))
        {
            $compare = $this->getMascotGroupCategory($id);
           
            try
            {
                if ($mascot_group_category->id == $compare->mascot_group_category->id)
                {
                    return false;
                }
            } catch (QueryException $e) {
                $error = $e->getMessage();
            } catch (Exception $e) {
                $error = $e->getMessage();
            }
        }

        return !is_null($mascot_group_category);
    }

    public function getMascotGroupCategoryByName($name)
    {
        $response = $this->get('mascot_group_category/name/' . $name);
        $result= $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->mascot_category;
        }
        return null;

    }

    public function getMascotGroupCategory($id)
    {
        $response = $this->get('mascot_group_category/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->mascot_group_category;
        }

        return null;
    }

    public function createMascotGroupCategory($data)
    {
        $response = $this->post('mascot_group_category', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateMascotGroupCategory($data)
    {
        $response = $this->post('mascot_group_category/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }
}