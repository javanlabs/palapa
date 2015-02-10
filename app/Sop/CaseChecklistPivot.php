<?php namespace App\Sop;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CaseChecklistPivot extends Pivot {

    public function checklist()
    {
        return $this->belongsTo('App\Sop\Checklist', 'checklist_id');
    }

    public function getNumberAttribute()
    {
        $checklist = $this->checklist;

        if($checklist && $checklist['number_field'])
        {
            return $this->parent[$checklist['number_field']];
        }

        return $this->attributes['number'];
    }
}
