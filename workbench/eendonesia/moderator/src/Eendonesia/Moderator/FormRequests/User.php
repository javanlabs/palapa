<?php namespace Eendonesia\Moderator\FormRequests;

use Illuminate\Foundation\Http\FormRequest;

class User extends FormRequest {

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		$rules =  [
			'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $this->get('id'),
			'password' => 'required',
		];

        if($this->get('id'))
        {
            unset($rules['password']);
        }

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
