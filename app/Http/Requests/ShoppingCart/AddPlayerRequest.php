<?php

namespace App\Http\Requests\ShoppingCart;

use App\Http\Requests\Request;

class AddPlayerRequest extends Request
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
            'size' => "required",
            'last_name' => "required|min:2|max:50|alpha_spaces",
            'number' => "required|numeric|min:0|max:99|digits_between:1,2",
            'quantity' => "required|numeric|min:1|max:100",
            'cart_item_id' => "required|numeric"
        ];
    }
}
