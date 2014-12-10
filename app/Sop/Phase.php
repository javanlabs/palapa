<?php namespace App\Sop;

use Illuminate\Database\Eloquent\Model;

class Phase extends Model {

    protected $table = 'sop_phase';

    public function checklist()
    {
        return $this->hasMany('App\Sop\Checklist', 'phase_id');
    }

    public function nextPhase()
    {
        return $this->where('ordinal', '>', $this->ordinal)->orderBy('ordinal', 'asc')->first();
    }
}
