<?php namespace App\Cases;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Suspects extends Model {

    const TYPE_INDIVIDU = 'individu';
    const TYPE_COMPANY = 'badan';

    const SEX_MALE = 'Laki-laki';
    const SEX_FEMALE = 'Perempuan';

    protected $table = 'suspects';

    protected $fillable = ['type', 'name', 'pob_id', 'dob', 'age', 'religion', 'address', 'city_id', 'nationality', 'job', 'education', 'nama_pimpinan', 'tahanan', 'tgl_penahanan', 'status', 'sex'];

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

    public function setTglPenahananAttribute($value)
    {
        if($value)
        {
            $value = Carbon::createFromFormat('d-m-Y', $value)->toDateString();
        }

        $this->attributes['tgl_penahanan'] = $value;
    }

    public function setDobAttribute($value)
    {
        if($value)
        {
            $value = Carbon::createFromFormat('d-m-Y', $value)->toDateString();
        }

        $this->attributes['dob'] = $value;
    }

    public function getIsIndividuAttribute()
    {
        return $this->type == self::TYPE_INDIVIDU;
    }

    public function getIsCompanyAttribute()
    {
        return $this->type == self::TYPE_COMPANY;
    }

    public function getSexIconAttribute()
    {
        if($this->type == self::TYPE_COMPANY)
        {
            $icon = '<i class="icon ion-home"></i>';
        }
        else
        {
            if($this->sex == self::SEX_MALE)
            {
                $icon = '<i class="icon ion-man"></i>';
            }
            else
            {
                $icon = '<i class="icon ion-woman"></i>';
            }
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

    public function getTglPenahananAttribute()
    {
        if($this->attributes['tgl_penahanan'])
        {
            return Carbon::createFromFormat('Y-m-d', $this->attributes['tgl_penahanan'])->format('d-m-Y');
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

}
