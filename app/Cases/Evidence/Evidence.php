<?php namespace App\Cases\Evidence;

use App\AuditTrail\Loggable;
use App\AuditTrail\RevisionableTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Evidence extends Model implements Loggable{

    use RevisionableTrait, SoftDeletes;

    protected $table = 'cases_evidences';

    protected $fillable = ['name'];

    protected $dates = [];

    public function cases()
    {
        return $this->belongsTo('App\Cases\Cases', 'case_id');
    }

    public function getNameAttribute()
    {
        return $this->attributes['name'];
    }
}
