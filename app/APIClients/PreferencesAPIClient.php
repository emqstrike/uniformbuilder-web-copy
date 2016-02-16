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

    public function isPreferenceTaken($name, $id)
    {
        $response = $this->get('preference/name/' . $name);
        $result = $this->decoder->decode($response->getBody());

        $preference = null;
        if ($result->success)
        {
            $preference = $result->preference->preference;
        }

        if (!is_null($preference) && !is_null($id))
        {
            $compare = $this->getPreference($id);
            try
            {
                if ($preference->id == $compare->id)
                {
                    return false;
                }
            } catch (QueryException $e) {
                $error = $e->getMessage();
            } catch (Exception $e) {
                $error = $e->getMessage();
            }
        }
        return !is_null($preference);
    }

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

    public function updatePreference($data)
    {
        $response = $this->post('preference/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }
}