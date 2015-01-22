<?php namespace App\Sop;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;

class Phase extends Model {

    protected $table = 'sop_phase';

    public function checklist()
    {
        return $this->hasMany('App\Sop\Checklist', 'phase_id')->orderBy('ordinal');
    }

    public function documents()
    {
        return $this->hasManyThrough('App\Cases\Document', 'App\Sop\Checklist');
    }

    public function nextPhase()
    {
        return $this->where('ordinal', '>', $this->ordinal)->orderBy('ordinal', 'asc')->first();
    }

    public function prevPhase()
    {
        return $this->where('ordinal', '<', $this->ordinal)->orderBy('ordinal', 'desc')->first();
    }

    public function close()
    {
        $this->finish_date = Carbon::now()->toDateString();
        return $this->save();
    }

    public function getColorAttribute()
    {
        $colors = Config::get('color');
        return $colors[array_rand(array_slice($colors, $this->id - 1, 1), 1)];
    }

    public function isHigher($phase)
    {
        return $this->ordinal >= $phase->ordinal;
    }

    public function getDurationAttribute()
    {
        return $this->countDuration();
    }

    public function countDuration()
    {
        $duration = 0;
        foreach($this->checklist as $checklist)
        {
            $duration += $checklist->duration;
        }

        return $duration;
    }
}
