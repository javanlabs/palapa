<?php namespace App\Cases;

use App\Model\Template;
use App\Sop\Phase;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cases extends Model {

    use SoftDeletes, Presenter;

    protected $table = 'cases';

    protected $fillable = ['name', 'spdp_number', 'pasal', 'kasus', 'start_date', 'suspect_name', 'suspect_pob', 'suspect_dob', 'suspect_religion', 'suspect_address', 'suspect_city_id', 'jaksa_id', 'staff_id', 'suspect_nationality', 'suspect_job', 'suspect_education', 'penyidik_id', 'type_id'];

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

    public function type()
    {
        return $this->belongsTo('App\Lookup\Lookup', 'type_id');
    }

    public function phase()
    {
        return $this->belongsTo('App\Sop\Phase', 'phase_id');
    }

    public function checklist()
    {
        return $this->belongsToMany('App\Sop\Checklist', 'cases_checklist', 'case_id', 'checklist_id')->withPivot('date', 'note')->withTimestamps();
    }

    public function activities()
    {
        return $this->hasMany('App\Cases\Activity', 'case_id');
    }

    public function documents(){
        return $this->hasMany('App\Cases\Document', 'case_id');
    }

    public function templates(){

        return Template::join('sop_phase', 'phase_id', '=', 'sop_phase.id')
            ->select('templates.*')
            ->where('case_type_id', '=', $this->type_id)
            ->get();
    }

    public function phaseHistory()
    {
        return $this->belongsToMany('App\Sop\Phase', 'cases_phases_history', 'case_id', 'phase_id')->withPivot('start_date', 'finish_date')->orderBy('start_date');
    }

    public function activePhase()
    {
        return $this->belongsToMany('App\Sop\Phase', 'cases_phases_history', 'case_id', 'phase_id')->withPivot('start_date', 'finish_date')->orderBy('start_date')->whereNull('finish_date');
    }

    public function suspectCity()
    {
        return $this->belongsTo('Eendonesia\Wilayah\Kabupaten', 'suspect_city_id');
    }

    public function penyidik()
    {
        return $this->belongsTo('App\Lookup\Lookup', 'penyidik_id');
    }

    public function suspectPob()
    {
        return $this->belongsTo('Eendonesia\Wilayah\Kabupaten', 'suspect_pob');
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

    public function reopenPhase($phase)
    {
        foreach($this->phaseHistory as $history)
        {
            if($history->id === $phase->id)
            {
                $history->pivot->finish_date = null;
                $history->pivot->save();
            }
        }
    }

    public function checklistRemaining($checklist)
    {
        $activePhase = $this->activePhase()->first();

        if($activePhase)
        {
            $phaseAge = Carbon::createFromFormat('Y-m-d', $activePhase->pivot->start_date)->diffInDays(new Carbon());
            return $checklist['duration'] - $phaseAge;
        }

        return false;
    }

    public function isLatestChecklist($checklist)
    {
        $lastChecklist = $this->checklist()->orderBy('created_at', 'desc')->first();

        if($lastChecklist)
        {
            return $lastChecklist->id == $checklist->id;
        }

        return false;
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

    public function removeActivity($checklist)
    {
        return $this->activities()->where('checklist_id', '=', $checklist->id)->delete();
    }

    public function setStartDateAttribute($value) 
    {
        $this->attributes['start_date'] = Carbon::createFromFormat('d-m-Y', $value)->toDateString();
    }    
}
