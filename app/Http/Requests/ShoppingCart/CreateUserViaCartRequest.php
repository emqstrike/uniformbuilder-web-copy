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
            'first_name' => "required",
            'last_name' => "required",
            'email' => "required",
            'password' => "required"
            // 'confirm_password' => "required"
        ];
    }
}
