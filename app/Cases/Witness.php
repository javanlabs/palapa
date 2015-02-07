<?php namespace App\Cases;

use App\AuditTrail\Loggable;
use App\AuditTrail\RevisionableTrait;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Witness extends Model implements Loggable{

    const SEX_MALE = 'Laki-laki';
    const SEX_FEMALE = 'Perempuan';

    use RevisionableTrait, SoftDeletes;

    protected $table = 'witness';

    protected $fillable = ['type', 'name', 'pob_id', 'dob', 'age', 'religion', 'address', 'city_id', 'nationality', 'job', 'education', 'sex'];

     protected $dates = [];

    public function cases()
    {
        return $this->belongsToMany('App\Cases\Cases');
    }

    public function city()
    {
        return $this->belongsTo('Eendonesia\Wilayah\Kabupaten', 'city_id');
    }


    public function pob()
    {
        return $this->belongsTo('Eendonesia\Wilayah\Kabupaten', 'pob_id');
    }

    public function setDobAttribute($value)
    {
        if($value)
        {
            $value = Carbon::createFromFormat('d-m-Y', $value)->toDateString();
        }
        else
        {
            $value = null;
        }

        $this->attributes['dob'] = $value;
    }

    public function getSexIconAttribute()
    {
        if($this->sex == self::SEX_MALE)
        {
            $icon = '<i class="icon ion-man"></i>';
        }
        else
        {
            $icon = '<i class="icon ion-woman"></i>';
        }

        return $icon;
    }

    public function getPobNameAttribute()
    {
        if($this->pob)
        {
            return $this->pob->nama;
        }

        return false;
    }

    public function getCityNameAttribute()
    {
        if($this->city)
        {
            return $this->city->nama;
        }

        return false;
    }

    public function getDobAttribute()
    {
        if($this->attributes['dob'])
        {
            return Carbon::createFromFormat('Y-m-d', $this->attributes['dob'])->format('d-m-Y');
        }

        return false;
    }

    public function getNameAttribute()
    {
        return $this->attributes['name'];
    }
}
