<?php namespace App\Cases\Court;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Court extends Model {

    protected $table = 'cases_courts';

    protected $fillable = ['agenda', 'date'];

    protected $dates = [];

    public function cases()
    {
        return $this->belongsTo('App\Cases\Cases', 'case_id');
    }

    public function getDateAttribute()
    {
        if($this->attributes['date'])
        {
            return Carbon::createFromFormat('Y-m-d', $this->attributes['date'])->format('d-m-Y');
        }

        return false;
    }

    public function getDateForHumanAttribute()
    {
        if($this->attributes['date'])
        {
            return Carbon::createFromFormat('Y-m-d', $this->attributes['date'])->formatLocalized('%A, %d %B %Y');
        }

        return false;
    }

    public function setDateAttribute($value)
    {
        if($value)
        {
            $value = Carbon::createFromFormat('d-m-Y', $value)->toDateString();
        }
        else
        {
            $value = null;
        }

        $this->attributes['date'] = $value;
    }

}
