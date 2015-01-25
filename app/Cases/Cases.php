<?php namespace App\Cases;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cases extends Model {

    const STATUS_DRAFT      = 'draft';
    const STATUS_ONGOING    = 'ongoing';
    const STATUS_FINISH     = 'finish';
    const STATUS_SUSPEND    = 'suspend';

    const TYPE_PIDUM    = 201;
    const TYPE_PIDSUS   = 202;

    use SoftDeletes, Presenter, DateSetter;

    protected $table = 'cases';

    protected $fillable = ['name', 'spdp_number', 'pasal', 'kasus', 'crime_place', 'crime_time', 'start_date', 'spdp_date', 'spdp_received_date', 'persidangan_date',  'jaksa_id', 'staff_id', 'suspect_nationality', 'suspect_job', 'suspect_education', 'penyidik_id', 'type_id'];

    protected $dates = ['start_date', 'finish_date', 'spdp_date', 'crime_time', 'persidangan_date'];

    public function scopePublished($query)
    {
        return $query->where('status', '<>', self::STATUS_DRAFT);
    }

    public function suspects()
    {
        return $this->belongsToMany('App\Cases\Suspects');
    }

    public function witness()
    {
        return $this->belongsToMany('App\Cases\Witness');
    }

    public function suspectNames(){
        $suspects = array();
        foreach($this->suspects as $row){
            $suspects[] = $row->name;
        }
        return implode(', ', $suspects);
    }

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
        return $this->belongsTo('App\Officer\Officer', 'staff_id');
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

    public function highestChecklist()
    {
        return $this->belongsToMany('App\Sop\Checklist', 'cases_checklist', 'case_id', 'checklist_id')->orderBy('ordinal', 'desc');
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

    public function suspectCity()
    {
        return $this->belongsTo('Eendonesia\Wilayah\Kabupaten', 'suspect_city_id');
    }

    public function penyidik()
    {
        return $this->belongsTo('App\Lookup\Lookup', 'penyidik_id');
    }

    public function penyidikExternal()
    {
        return $this->belongsTo('App\Lookup\Lookup', 'penyidik_id');
    }

    public function penyidikInternal()
    {
        return $this->belongsTo('App\Officer\Officer', 'penyidik_id');
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
        $ticker = $this->ticker;

        if($ticker)
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

    public function addActivity($title, $content, $date = null, $checklist = null)
    {
        if(!$date)
        {
            $date = Carbon::now()->toDateString();
        }

        $attributes = [
            'title' => $title,
            'content'   => $content,
            'date' => $date
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

    public function start($date)
    {
        $this->status = self::STATUS_ONGOING;
        $this->start_date = $date;

        $attributes = ['start_date' => Carbon::createFromFormat('d-m-Y', $date)->toDateString()];
        $this->phaseHistory()->attach($this->phase->id, $attributes);

        return $this->save();
    }

    public function unpublish()
    {
        $this->status = self::STATUS_DRAFT;
        $this->start_date = null;

        $this->phaseHistory()->detach($this->phase->id);

        return $this->save();
    }

    public function finish()
    {
        $this->status = self::STATUS_FINISH;
        return $this->save();
    }

    public function suspend()
    {
        $this->status = self::STATUS_SUSPEND;
        return $this->save();
    }

    public function setPenyidikIdAttribute($id)
    {
        if(!empty($id))
        {
            if(in_array($id[0], ['i', 'e']))
            {
                $this->attributes['penyidik_id'] = substr($id, 1);

                if($id[0] == 'i')
                {
                    $this->attributes['penyidik_type'] = 'internal';
                }
                else
                {
                    $this->attributes['penyidik_type'] = 'external';
                }
            }
        }
    }
}
