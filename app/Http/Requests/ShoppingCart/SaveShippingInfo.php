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
            'full_name' => "required",
            'athletic_director' => "required",
            'email' => "required",
            'phone_number' => "required",
            'fax' => "required",

            'address' => "required",
            'state' => "required",
            'city' => "required",
            'zip_code' => "required"
        ];
    }
}
