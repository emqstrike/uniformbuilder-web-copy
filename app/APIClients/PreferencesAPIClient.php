<?php
namespace App\APIClients;

class PreferencesAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getPreferences()
    {
        $response = $this->get('preferences');
        $result = $this->decoder->decode($response->getBody());

        $preferences = [];
        if ($result->success)
        {
            $preferences = $result->preferences;
        }
        return $preferences;
    }

    // public function isMascotCategoryTaken($name, $id)
    // {
    //     $response = $this->get('mascot_category/name/' . $name);
    //     $result = $this->decoder->decode($response->getBody());

    //     $mascot_category = null;
    //     if ($result->success)
    //     {
    //         $mascot_category = $result->mascot_category;
    //     }

    //     if (!is_null($mascot_category) && !is_null($id))
    //     {
    //         $compare = $this->getMascotCategory($id);//dd($compare);
    //         try
    //         {
    //             if ($mascot_category->id == $compare->mascot_category->id)
    //             {
    //                 return false;
    //             }
    //         } catch (QueryException $e) {
    //             $error = $e->getMessage();
    //         } catch (Exception $e) {
    //             $error = $e->getMessage();
    //         }
    //     }
    //     return !is_null($mascot_category);
    // }

    // public function getMascotCategoryByName($name)
    // {
    //     $response = $this->get('mascot_category/name/' . $name);
    //     $result = $this->decoder->decode($response->getBody());
    //     if ($result->success)
    //     {
    //         return $result->mascot_category;
    //     }
    //     return null;
    // }

    public function getPreference($id)
    {
        $response = $this->get('preference/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->preference;
        }
        return null;
    }

    public function createPreference($data)
    {
        $response = $this->post('preference', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    // public function updateMascotCategory($data)
    // {
    //     $response = $this->post('mascot_category/update', [
    //         'json' => $data
    //     ]);
    //     return $this->decoder->decode($response->getBody());
    // }
}