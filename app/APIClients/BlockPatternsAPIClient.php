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

    public function getTotalCount($filter = null)
    {
        $response = $this->get('block_patterns/total_count/' . $filter);
        $result = $this->decoder->decode($response->getBody());

        $count = 0;

        if ($result->success) {
            $count = $result->count;
        }

        return $count;
    }

    public function getFiltered($filters)
    {
        $sport = '';
        $gender = '';

        if (isset($filters['sport'])) {
            $sport = '&sport=' . $filters['sport'];
        }

        if (isset($filters['gender']))
        {
            $gender = '&gender=' . $filters['gender'];
        }

        $response = $this->get('block_patterns/filtered?' . $sport . $gender);
        $result = $this->decoder->decode($response->getBody());

        $block_patterns = [];

        if ($result->success) {
            $block_patterns = $result->block_patterns;
        }

        return $block_patterns;
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