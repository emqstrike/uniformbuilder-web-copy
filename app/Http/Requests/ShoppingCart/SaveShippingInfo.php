<?php

namespace App\Http\Requests\ShoppingCart;

use App\Http\Requests\Request;

class SaveShippingInfo extends Request
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
            'full_name' => "required|min:4|max:50|alpha_spaces",
            'athletic_director' => "required|min:4|max:50|alpha_spaces",
            'email' => "required|email",
            'phone_number' => "required", // skip
            'fax' => "required", // skip

            'address' => "required|min:10|max:50",
            'state' => "required", // skp
            'city' => "required", // skip
            'zip_code' => "required" // skip
        ];
    }
}
