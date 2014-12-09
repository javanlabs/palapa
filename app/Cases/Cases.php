<?php namespace App\Cases;

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

    public function phaseHistory()
    {
        return $this->belongsToMany('App\Sop\Phase', 'cases_phases_history', 'case_id', 'phase_id')->withPivot('start_date', 'finish_date')->orderBy('start_date');
    }
}
