<?php namespace App\Cases;

use App\Officer\Officer;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Sop\Checklist;

class Cases extends Model {

    const STATUS_DRAFT      = 'draft';
    const STATUS_ONGOING    = 'ongoing';
    const STATUS_FINISH     = 'finish';
    const STATUS_SUSPEND    = 'suspend';

    const TYPE_PIDUM    = 201;
    const TYPE_PIDSUS   = 202;
    const TYPE_DATUN   = 203;

    use SoftDeletes, Presenter, DateSetter;

    protected $table = 'cases';

    protected $fillable = ['name', 'spdp_number', 'pasal', 'category', 'kasus', 'crime_place', 'crime_time', 'start_date', 'spdp_date', 'spdp_number', 'persidangan_date',  'jaksa_id', 'staff_id', 'suspect_nationality', 'suspect_job', 'suspect_education', 'penyidik_id', 'type_id', 'berkas_number', 'berkas_date'];

    protected $dates = ['start_date', 'finish_date', 'spdp_date', 'crime_time', 'persidangan_date', 'berkas_date'];

    public function scopePublished($query)
    {
        return $query->where('status', '<>', self::STATUS_DRAFT);
    }

    public function scopeOwnedBy($query, $user)
    {
        $officer_id = -999;
        if($user->officer)
        {
            $officer_id = $user->officer->id;
        }
        $user_id = $user->id;
        $query->where(function($query2) use ($officer_id, $user_id){
            $query2->where('jaksa_id',$officer_id)->orWhere('staff_id', $officer_id)->orWhere('author_id', $user_id);
        });

        return $query;
    }

    public function suspects()
    {
        return $this->belongsToMany('App\Cases\Suspects');
    }

    public function witness()
    {
        return $this->belongsToMany('App\Cases\Witness');
    }

    public function courts()
    {
        return $this->hasMany('App\Cases\Court\Court', 'case_id');
    }

    public function evidences()
    {
        return $this->hasMany('App\Cases\Evidence\Evidence', 'case_id');
    }

    public function members()
    {
        return $this->belongsToMany('App\Officer\Officer', 'cases_officers', 'case_id', 'officer_id')->whereRole(Officer::ROLE_JAKSA);
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

    public function closeCurrentPhase($date)
    {
        foreach($this->phaseHistory as $phase)
        {
            if($phase->pivot->finish_date === null)
            {
                $phase->pivot->finish_date = $date;
                return $phase->pivot->save();
            }
        }
    }

    public function updatePhaseFinishDate($phase, $date)
    {
        foreach($this->phaseHistory as $history)
        {
            if($history->id === $phase->id)
            {
                $history->pivot->finish_date = $date;
                return $history->pivot->save();
            }
        }
    }

    public function updatePhaseStartDate($phase, $date)
    {
        foreach($this->phaseHistory as $history)
        {
            if($history->id === $phase->id)
            {
                $history->pivot->start_date = $date;
                return $history->pivot->save();
            }
        }
    }

    public function hasPhaseHistory($phase)
    {
        return $this->phaseHistory()->where('phase_id', '=', $phase->id)->exists();
    }

    public function reopenPhase($phase)
    {
        foreach($this->phaseHistory as $history)
        {
            if($history->id === $phase->id)
            {
                $history->pivot->finish_date = null;
                return $history->pivot->save();
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
        if($checklist)
        {
            return $this->activities()->where('checklist_id', '=', $checklist->id)->delete();
        }

        return false;
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

    public function publish()
    {
        $this->status = self::STATUS_ONGOING;
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

    public function getLatestActivityAttribute(){
        $latest = \DB::table('cases_checklist')->where('case_id','=',$this->attributes['id'])->orderBy('created_at','DESC')->first();
        if($latest){
            $checklist = Checklist::find($latest->checklist_id);
            return $checklist;
        }
        else
            return '';
    }
}
