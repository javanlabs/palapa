<?php namespace App\Cases;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Activity extends Model {

    protected $table = 'cases_activities';

    protected $fillable = ['title', 'content', 'date'];

    protected $dates = ['date'];

    public function cases()
    {
        return $this->belongsTo('App\Cases\Cases', 'case_id');
    }

    public function checklist()
    {
        return $this->belongsTo('App\Sop\Checklist', 'checklist_id');
    }

    public function getDateAttribute()
    {
        return Carbon::createFromFormat('Y-m-d', $this->attributes['date'])->format('d-m-Y');
    }

}
