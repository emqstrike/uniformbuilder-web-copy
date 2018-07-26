<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class AddHelperRequest extends Request
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
            'feature_name' => 'required',
            'group' => 'required',
            'category' => 'required',
            'description' => 'required',
            'index' => 'required'
        ];
    }
}
