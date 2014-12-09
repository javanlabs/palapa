<?php namespace App\Sop;

use Illuminate\Database\Eloquent\Model;

class Checklist extends Model {

    protected $table = 'sop_checklist';

    public function checklist()
    {
        return $this->belongsTo('App\Sop\Phase', 'phase_id');
    }

}
