<?php namespace App\Cases;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model {

    protected $table = 'cases_activities';

    protected $fillable = ['title', 'content'];

    public function cases()
    {
        return $this->belongsTo('App\Cases\Cases', 'case_id');
    }

    public function checklist()
    {
        return $this->belongsTo('App\Sop\Checklist', 'checklist_id');
    }

}
