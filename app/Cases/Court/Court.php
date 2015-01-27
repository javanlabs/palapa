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

    public function scopeUpcoming($query)
    {
        return $query->where('date', '>=', Carbon::now()->toDateString())->orderBy('date', 'asc');
    }

    public function scopeByDate($query, $date)
    {
        if($date)
        {
            $query->where('date', '=', Carbon::createFromFormat('d-m-Y', $date)->toDateString());
        }

        return $query;
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

    public function getScheduleInDaysAttribute()
    {
        if($this->attributes['date'])
        {
            return Carbon::createFromFormat('Y-m-d', $this->attributes['date'])->diffInDays(new Carbon());
        }

        return false;
    }

    public function getScheduleForHumanAttribute()
    {
        if($this['schedule_in_days'] == 0)
        {
            return 'hari ini';
        }
        elseif($this['schedule_in_days'] == 1)
        {
            return "besok";
        }
        else
        {
            return $this['schedule_in_days'] . " hari lagi";
        }
    }

}
