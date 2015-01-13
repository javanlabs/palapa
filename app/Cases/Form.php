<?php namespace App\Cases;

use Illuminate\Foundation\Http\FormRequest;

class Form extends FormRequest {

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
            'pasal'            => 'required',
			'kasus'            => 'required',
		 	'start_date'       => 'required',
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
