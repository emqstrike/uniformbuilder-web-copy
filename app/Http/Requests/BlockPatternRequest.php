<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Support\Facades\Input;

class BlockPatternRequest extends Request
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
        $rules = [];
        $files = Input::file('neck_option_image');

        if ($files) {
            foreach ($files as $key => $file) {
                $rules['neck_option_image.' . $key] = 'image';
            }
        }

        return $rules;
    }

    public function messages()
    {
        $messages = [];
        $files = Input::file('neck_option_image');

        if ($files) {
            foreach ($files as $key => $file) {
                $messages['neck_option_image.' . $key . '.image'] = 'Neck option image ' . ($key + 1) . ' should be image.';
            }
        }

        return $messages;
    }
}
