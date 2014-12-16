<?php namespace App\Cases;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cases extends Model {

    use SoftDeletes, Presenter;

    protected $table = 'cases';

    protected $fillable = ['name', 'spdp_number', 'pasal', 'kasus', 'start_date', 'suspect_name', 'suspect_pob', 'suspect_dob', 'suspect_religion', 'suspect_address', 'suspect_city_id', 'jaksa_id', 'staff_id'];

    protected $dates = ['start_date', 'finish_date'];

    public function author()
    {
        return $this->belongsTo('Eendonesia\Moderator\Models\User', 'author_id');
    }

    public function jaksa()
    {
        return $this->belongsTo('App\Officer\Officer', 'jaksa_id');
    }

    public function staff()
    {
        return $this->belongsTo('Eendonesia\Moderator\Models\User', 'staff_id');
    }

    public function phase()
    {
        return $this->belongsTo('App\Sop\Phase', 'phase_id');
    }

    public function checklist()
    {
        return $this->belongsToMany('App\Sop\Checklist', 'cases_checklist', 'case_id', 'checklist_id')->withPivot('date', 'note')->orderBy('date', 'desc');
    }

    public function activities()
    {
        return $this->hasMany('App\Cases\Activity', 'case_id');
    }

    public function documents(){
        return $this->hasMany('App\Cases\Document', 'case_id');
    }

    public function phaseHistory()
    {
        return $this->belongsToMany('App\Sop\Phase', 'cases_phases_history', 'case_id', 'phase_id')->withPivot('start_date', 'finish_date')->orderBy('start_date');
    }

    public function activePhase()
    {
        return $this->belongsToMany('App\Sop\Phase', 'cases_phases_history', 'case_id', 'phase_id')->withPivot('start_date', 'finish_date')->orderBy('start_date')->whereNull('finish_date');
    }

    public function close()
    {
        $this->finish_date = Carbon::now()->toDateString();
        return $this->save();
    }

    public function closeCurrentPhase()
    {
        foreach($this->phaseHistory as $phase)
        {
            if($phase->pivot->finish_date === null)
            {
                $phase->pivot->finish_date = Carbon::now()->toDateString();
                $phase->pivot->save();
            }
        }
    }

    public function checklistRemaining($checklist)
    {
        $phaseAge = Carbon::createFromFormat('Y-m-d', $this->activePhase()->first()->pivot->start_date)->diffInDays(new Carbon());
        return $checklist['duration'] - $phaseAge;
    }

    public function addActivity($title, $content, $checklist = null)
    {
        $attributes = [
            'title' => $title,
            'content'   => $content
        ];

        $activity = $this->activities()->create($attributes);

        if($checklist)
        {
            $activity->checklist()->associate($checklist)->save();
        }

        return true;
    }
}
