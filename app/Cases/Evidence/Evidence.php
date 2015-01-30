<?php namespace App\Cases\Evidence;

use Illuminate\Database\Eloquent\Model;

class Evidence extends Model {

    protected $table = 'cases_evidences';

    protected $fillable = ['name'];

    protected $dates = [];

    public function cases()
    {
        return $this->belongsTo('App\Cases\Cases', 'case_id');
    }

}
