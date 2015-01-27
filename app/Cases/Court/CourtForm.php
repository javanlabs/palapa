<?php namespace App\Cases\Court;

use Illuminate\Foundation\Http\FormRequest;

class CourtForm extends FormRequest {

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'agenda'          => 'required',
            'date'            => 'required',
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
