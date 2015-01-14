<?php namespace app\Cases;

use Carbon\Carbon;

trait DateSetter {

    public function setStartDateAttribute($value)
    {
        $this->attributes['start_date'] = Carbon::createFromFormat('d-m-Y', $value)->toDateString();
    }

    public function setSpdpDateAttribute($value)
    {
        $this->attributes['spdp_date'] = Carbon::createFromFormat('d-m-Y', $value)->toDateString();
    }

    public function setSpdpReceivedDateAttribute($value)
    {
        $this->attributes['spdp_received_date'] = Carbon::createFromFormat('d-m-Y', $value)->toDateString();

        // automatically set start date when spdp received
        $this->attributes['start_date'] = $this->attributes['spdp_received_date'];
    }

    public function setPersidanganDateAttribute($value)
    {
        $this->attributes['persidangan_date'] = Carbon::createFromFormat('d-m-Y', $value)->toDateString();
    }

}