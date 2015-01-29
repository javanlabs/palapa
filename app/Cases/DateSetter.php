<?php namespace app\Cases;

use Carbon\Carbon;

trait DateSetter {

    public function setStartDateAttribute($value)
    {
        if($value)
        {
            $value = Carbon::createFromFormat('d-m-Y', $value)->toDateString();
        }

        $this->attributes['start_date'] = $value;
    }

    public function setSpdpDateAttribute($value)
    {
        if($value)
        {
            $value = Carbon::createFromFormat('d-m-Y', $value)->toDateString();
        }

        $this->attributes['spdp_date'] = $value;
    }

    public function setPersidanganDateAttribute($value)
    {
        if($value)
        {
            $value = Carbon::createFromFormat('d-m-Y', $value)->toDateString();
        }

        $this->attributes['persidangan_date'] = $value;
    }

    public function setCrimeTimeAttribute($value)
    {
        if($value)
        {
            $this->attributes['crime_time'] = $value;
        }
    }

    public function setBerkasDateAttribute($value)
    {
        if($value)
        {
            $value = Carbon::createFromFormat('d-m-Y', $value)->toDateString();
        }

        $this->attributes['berkas_date'] = $value;
    }


}