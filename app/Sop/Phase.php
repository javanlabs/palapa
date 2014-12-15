<?php namespace App\Sop;

use Carbon\Carbon;
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

    public function close()
    {
        $this->finish_date = Carbon::now()->toDateString();
        return $this->save();
    }

    public function getColorAttribute()
    {
        return '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
    }
}
