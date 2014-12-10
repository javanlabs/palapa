<?php namespace App\Cases;

use Carbon\Carbon;

trait Presenter {

    public function getPermalinkAttribute()
    {
        return route('backend.cases.show', [$this->id]);
    }

    public function getNameAttribute()
    {
        return $this->kasus;
    }

    public function getProsecutorNameAttribute()
    {
        return $this->jaksa->name;
    }

    public function getStaffNameAttribute()
    {
        return $this->staff->name;
    }

    public function getLastUpdateAttribute()
    {
        return $this->updated_at->formatLocalized('%d %B %Y');
    }

    public function getStatusSpdpAttribute()
    {
        return $this->getPhaseStatus($this->phaseHistory()->where('phase_id', '=', 1)->first());
    }

    public function getStatusTahap1Attribute()
    {
        return $this->getPhaseStatus($this->phaseHistory()->where('phase_id', '=', 2)->first());
    }

    public function getStatusTahap2Attribute()
    {
        return $this->getPhaseStatus($this->phaseHistory()->where('phase_id', '=', 3)->first());
    }

    public function getStatusPenuntutanAttribute()
    {
        return $this->getPhaseStatus($this->phaseHistory()->where('phase_id', '=', 4)->first());
    }

    public function getStatusPersidanganAttribute()
    {
        return $this->getPhaseStatus($this->phaseHistory()->where('phase_id', '=', 5)->first());
    }

    public function getStatusNameAttribute()
    {
        return $this->phase->name;
    }

    public function getAgeAttribute()
    {
        return $this->start_date->diffInDays(Carbon::now());
    }

    protected function getPhaseStatus($phase)
    {
        if(!$phase)
        {
            return false;
        }

        $startDate = Carbon::createFromFormat('Y-m-d', $phase->pivot->start_date);

        if($phase->pivot->finish_date == null)
        {
            $duration = Carbon::now()->diffInDays($startDate);
        }
        else
        {
            $finishDate = Carbon::createFromFormat('Y-m-d', $phase->pivot->finish_date);
            $duration = $startDate->diffInDays($finishDate);
        }

        $baseDuration = $phase->duration;

        $delta = $baseDuration - $duration;
        if($delta > 2)
        {
            $status = 'success';
        }
        elseif($delta >= 0)
        {
            $status = 'warning';
        }
        else
        {
            $status = 'danger';
        }

        return $status;
    }
}
