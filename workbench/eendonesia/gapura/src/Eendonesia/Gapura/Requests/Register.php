<?php namespace Eendonesia\Gapura\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Register extends FormRequest {

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
            'name'                  => 'required',
            'email'                 => 'required|email|unique:users',
            'password'              => 'required|confirmed',
            'password_confirmation' => 'required',
		];
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
