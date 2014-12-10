<?php namespace App\Sop;

use Illuminate\Database\Eloquent\Model;

class Checklist extends Model {

    protected $table = 'sop_checklist';

    public function phase()
    {
        return $this->belongsTo('App\Sop\Phase', 'phase_id');
    }

    public function getIsNextAttribute()
    {
        return $this->direction == 'next';
    }
}
