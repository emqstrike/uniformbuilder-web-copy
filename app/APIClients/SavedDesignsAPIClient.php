<?php
namespace App\APIClients;

use Illuminate\Support\Facades\Log;

class SavedDesignsAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getTotalCount()
    {
        $response = $this->get('saved_designs/total_count');
        $result = $this->decoder->decode($response->getBody());

        $count = 0;

        if ($result->success) {
            $count = $result->count;
        }
        
        return $count;
    }

    public function getAll()
    {
        $response = $this->get('saved_designs');
        $result = $this->decoder->decode($response->getBody());
        $saved_designs = [];
        if ($result->success)
        {
            $saved_designs = $result->saved_designs;
        }
        return $saved_designs;
    }

    public function getPaginated($currentPage, $filters)
    {
        $name = '';
        $sport = '';
        $blockPattern = '';
        $neckOption = '';
        $user = '';
        $range = '';

        if (isset($filters['name'])) {
            $name = '&name=' . $filters['name'];
        };

        if (isset($filters['sport'])) {
            $sport = '&sport=' . $filters['sport'];
        }

        if (isset($filters['blockPattern'])) {
            $blockPattern = '&blockPattern=' . $filters['blockPattern'];
        }

        if (isset($filters['neckOption'])) {
            $neckOption = '&neckOption=' . $filters['neckOption'];
        }

        if (isset($filters['user'])) {
            $user = '&email=' . $filters['user'];
        }

        if (isset($filters['range'])) {
            $range = '&range[]=' . $filters['range'][0] . '&range[]=' . $filters['range'][1];
        }

        $response = $this->get('saved_designs/paginate?page=' . $currentPage . $name . $sport . $neckOption . $blockPattern . $user . $range);
        $result = $this->decoder->decode($response->getBody());

        $saved_designs = [];

        if ($result->success)
        {
            return [
                'saved_designs' => $result->saved_designs->data,
                'total' => $result->saved_designs->total,
                'sports' => $result->sports,
                'block_patterns' => $result->block_patterns,
                'users' => $result->users,
                'neck_options' => $result->neck_options
            ];
        }

        return $saved_designs;
    }

    public function getSavedDesign($id)
    {

        $response = $this->get('saved_design/' . $id);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->saved_design;
        }

        return null;
    }

    public function getStats($year = null, $month = null, $day = null)
    {
        $endpoint = 'stats/saved-designs/' . $year;
        if (!is_null($month))
        {
            $endpoint .= '/' . $month;
            if (!is_null($day))
            {
                $endpoint .= '/' . $day;
            }
        }

        $response = $this->get($endpoint);
        $result = $this->decoder->decode($response->getBody());

        $saved_designs = [];
        if ($result->success)
        {
            $saved_designs = $result->saved_designs;
        }
        return $saved_designs;
    }

    public function getByUserId($id = null)
    {
        $response = $this->get('saved_design/getByUserId/' . $id);
        $result = $this->decoder->decode($response->getBody());

        if ($result->success)
        {
            return $result->saved_designs;
        }

        return null;
    }
}
