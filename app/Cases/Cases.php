<?php namespace App\Cases;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cases extends Model {

    use SoftDeletes, Presenter;

    protected $table = 'cases';

    protected $fillable = ['name', 'spdp_number', 'pasal', 'kasus', 'date', 'suspect_name', 'suspect_pob', 'suspect_dob', 'suspect_religion', 'suspect_address', 'suspect_city_id', 'jaksa_id', 'staff_id'];

    protected $dates = ['date'];

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

}
