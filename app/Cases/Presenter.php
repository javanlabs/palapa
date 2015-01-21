<?php namespace App\Cases;

use Carbon\Carbon;

trait Presenter {

    public function getPermalinkAttribute()
    {
        return route('backend.cases.view', [$this->id]);
    }

    public function getPermalinkEditAttribute()
    {
        return route('backend.cases.show', [$this->id]);
    }

    public function getNameAttribute()
    {
        return $this->kasus;
    }

    public function getSpdpNumberAttribute()
    {
        return $this->attributes['spdp_number']?$this->attributes['spdp_number']:'';
    }

    public function getProsecutorNameAttribute()
    {
        return $this->jaksa?$this->jaksa->name:'-';
    }

    public function getStaffNameAttribute()
    {
        return $this->staff?$this->staff->name:'-';
    }

    public function getLastUpdateAttribute()
    {
        return $this->updated_at->formatLocalized('%d %B %Y');
    }

    public function getPhaseHistoryStatus($phaseId)
    {
        return $this->getPhaseStatus($this->phaseHistory()->where('phase_id', '=', $phaseId)->first());
    }

    public function getPhaseHistoryDescription($phaseId)
    {
        $phaseHistory = $this->phaseHistory()->where('phase_id', '=', $phaseId)->first();

        if($phaseHistory)
        {
            $startDate = Carbon::createFromFormat('Y-m-d', $phaseHistory->pivot->start_date);

            if($phaseHistory->pivot->finish_date)
            {
                $finishDate = Carbon::createFromFormat('Y-m-d', $phaseHistory->pivot->finish_date);
            }
            else
            {
                $finishDate = Carbon::now();
            }

            $finishDateDisplayed = '-';
            if($phaseHistory->pivot->finish_date)
            {
                $finishDateDisplayed = $finishDate->formatLocalized('%d %B %Y');
            }

            $phaseStatus = $this->getPhaseStatus($phaseHistory);

            $msg = "<div>Mulai: " . $startDate->formatLocalized('%d %B %Y') . "</div>";
            $msg .= "<div>Selesai: " . $finishDateDisplayed . "</div>";
            $msg .= "<div>Durasi: <span class='label label-{$phaseStatus}'>" . $finishDate->diffInDays($startDate) . " hari</span></div>";
            $msg .= "<div>Standard pelayanan: " . $phaseHistory->duration . " hari</div>";

            return $msg;
        }

        return 'Belum diproses';
    }

    public function getStatusNameAttribute()
    {
        return $this->phase->name;
    }

    public function getAgeAttribute()
    {
        if($this->attributes['start_date'])
        {
            return Carbon::createFromFormat('Y-m-d', $this->attributes['start_date'])->diffInDays(Carbon::now());
        }

        return false;
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
        if($delta > 0)
        {
            $status = 'success';
        }
        elseif($delta == 0)
        {
            $status = 'warning';
        }
        else
        {
            $status = 'danger';
        }

        return $status;
    }

    public function getSuspectCityNameAttribute()
    {
        if($this->suspect_city)
        {
            return $this->suspect_city->nama;
        }

        return false;
    }

    public function getSuspectProvinceNameAttribute()
    {
        if($this->suspect_city && $this->suspect_city->provinsi)
        {
            return $this->suspect_city->provinsi->nama;
        }

        return false;
    }

    public function getTypeNameAttribute()
    {
        if($this->type)
        {
            return $this->type->name;
        }

        return false;
    }

    public function getPenyidikNameAttribute()
    {
        if($this->attributes['penyidik_type'] == 'external' && $this->penyidikExternal)
        {
            return $this->penyidikExternal->name;
        }
        elseif($this->attributes['penyidik_type'] == 'internal' && $this->penyidikInternal)
        {
            return $this->penyidikInternal->name;
        }

        return false;
    }

    public function getJaksaNameAttribute()
    {
        if($this->jaksa)
        {
            return $this->jaksa->name;
        }

        return false;
    }

    public function getJaksaNipAttribute()
    {
        if($this->jaksa)
        {
            return $this->jaksa->nip;
        }

        return false;
    }

    public function getJaksaPangkatAttribute()
    {
        if($this->jaksa && $this->jaksa->pangkat)
        {
            return $this->jaksa->pangkat->name;
        }

        return false;
    }

    public function getJaksaJabatanAttribute()
    {
        if($this->jaksa && $this->jaksa->jabatan)
        {
            return $this->jaksa->jabatan->name;
        }

        return false;
    }

    public function getStartDateAttribute()
    {
        if($this->attributes['start_date'])
        {
            return Carbon::createFromFormat('Y-m-d', $this->attributes['start_date'])->format('d-m-Y');
        }

        return false;
    }

    public function getSpdpDateAttribute()
    {
        if($this->attributes['spdp_date'])
        {
            return Carbon::createFromFormat('Y-m-d', $this->attributes['spdp_date'])->format('d-m-Y');
        }

        return false;
    }

    public function getScheduleInDaysAttribute()
    {
        if($this->attributes['persidangan_date'])
        {
            return Carbon::createFromFormat('Y-m-d', $this->attributes['persidangan_date'])->diffInDays(new Carbon());
        }

        return false;
    }

    public function getIsAllowCreateDocumentAttribute()
    {
        return $this->jaksa && $this->penyidik && !$this->suspects->isEmpty();
    }

    public function getPenyidikIdCustomAttribute()
    {
        if($this->attributes['penyidik_type'] == 'internal')
        {
            return 'i' . $this->attributes['penyidik_id'];
        }

        return 'e' . $this->attributes['penyidik_id'];
    }
}
