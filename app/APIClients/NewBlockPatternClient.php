<?php 
namespace App\APIClients;

class NewBlockPatternClient extends APIClient
{
    public function getAll() {
        $response = $this->get('new_block_patterns');
        $result = $this->decoder->decode($response->getBody());

        $newBlockPatterns = [];

        if ($result->success) {
            $newBlockPatterns = $result->new_block_patterns;
        }

        return $newBlockPatterns;
    }

    public function create($data)
    {
        $response = $this->post('new_block_pattern', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function getById($id)
    {
        $response = $this->get("new_block_patterns/$id");
        $result = $this->decoder->decode($response->getBody());

        $newBlockPattern = null;

        if ($result->success) {
            $newBlockPattern = $result->new_block_pattern;
        }

        return $newBlockPattern;
    }

    public function update($data)
    {
        $response = $this->patch("new_block_patterns/{$data['id']}/update", [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }
}