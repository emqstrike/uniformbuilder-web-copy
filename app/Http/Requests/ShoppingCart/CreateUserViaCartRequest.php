<?php

namespace App\Http\Requests\ShoppingCart;

use App\Http\Requests\Request;

class CreateUserViaCartRequest extends Request
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
            'first_name' => "required|min:2|max:50|alpha_spaces",
            'last_name' => "required|min:2|max:50|alpha_spaces",
            'email' => "required|email|email_not_exist",
            'password' => "required|min:8|max:50|confirmed"
        ];
    }
}
