<?php
namespace App\APIClients;

class FontsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function isFontExist($name, $id = null)
    {
        $font = $this->getFontByName($name);
        if (!is_null($font) && !is_null($id))
        {
            $compare = $this->getFont($id);
            if ($font->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($font);
    }

    public function isFontCodeExist($code, $id = null)
    {
        $font = $this->getFontByCode($code);
        if (!is_null($font) && !is_null($id))
        {
            $compare = $this->getFont($id);
            if ($font->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($font);
    }

    public function createFont($data)
    {
     
        $response = $this->post('font', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateFont($data)
    {
      
        $response = $this->post('font/update', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getFonts()
    {
        $response = $this->get('fonts');
        $result = $this->decoder->decode($response->getBody());

        $fonts = [];
        if ($result->success)
        {
            $fonts = $result->fonts;
        }
        return $fonts;
    }

    public function getFontsCreatedBy($id)
    {
        $response = $this->get('fonts/get_by_userid/'.$id);
        $result = $this->decoder->decode($response->getBody());

        $fonts = [];
        if ($result->success)
        {
            $fonts = $result->fonts;
        }
        return $fonts;
    }

    public function getAllFonts()
    {
        $response = $this->get('fonts');
        $result = $this->decoder->decode($response->getBody());

        $fonts = [];
        if ($result->success)
        {
            $fonts = $result->fonts;
        }
        return $fonts;
    }

    public function getDefaultFonts()
    {
        return $this->getFontByType('default');
    }

    public function getFontByType($type = 'default')
    {
        $response = $this->get('fonts/' . $type);
        $result = $this->decoder->decode($response->getBody());

        $fonts = [];
        if ($result->success)
        {
            $fonts = $result->fonts;
        }
        return $fonts;
    }

    public function getFont($id)
    {
        $response = $this->get('font/' . $id);

        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->font;
        }
        return null;
    }

    public function getFontByName($name)
    {
        $response = $this->get('font/name/' . $name);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->font;
        }
        return null;
    }

    public function getFontByCode($code)
    {
        $response = $this->get('font/code/' . $code);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->font;
        }
        return null;
    }

    public function getFilteredFonts($sport, $brand)
    {
        $response = $this->get("fonts/filter/$sport/$brand");
        $result = $this->decoder->decode($response->getBody());

        $fonts = [];

        if ($result->success) {
            $fonts = $result->fonts;
        }
        
        return $fonts;
    }
}