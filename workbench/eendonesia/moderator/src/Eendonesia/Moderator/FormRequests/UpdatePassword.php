<?php namespace Eendonesia\Moderator\FormRequests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UpdatePassword extends FormRequest {

    function __construct()
    {
        Validator::extend('correct_password', function($attribute, $value, $parameters)
        {
            $user = Auth::user();
            return Hash::check($value, $user->password);
        });
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules =  [
            'password_current'      => 'required|correct_password',
            'password'              => 'required|confirmed|min:6',
            'password_confirmation' => 'required',
        ];

        return $rules;
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

}
