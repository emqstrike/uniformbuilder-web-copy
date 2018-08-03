<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class UniformCategoryRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'thumbnail_male' => 'image',
            'thumbnail_female' => 'image',
            'thumbnail_youth' => 'image'
        ];
    }
}
