<?php
namespace Customizer\APIClients;

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