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
            // 'spdp_number'      => 'required',
            'pasal'            => 'required',
            'kasus'            => 'required',
             'start_date'       => 'required',
            // // 'suspect_name'     => 'required',
            // 'suspect_pob'      => 'required',
            // 'suspect_dob'      => 'required',
            // 'suspect_address'  => 'required',
            // 'suspect_religion' => 'required',
            // 'suspect_city_id'  => 'required',
            // 'jaksa_id'         => 'required',
            // 'staff_id'         => 'required',
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
